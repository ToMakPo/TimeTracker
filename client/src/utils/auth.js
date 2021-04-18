import { useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import { useHistory } from "react-router-dom"
import authAPI from "./authAPI"
import { useStoreContext } from "./store"
import { LOGIN_USER, LOGOUT_USER } from "./store/actions"

const setAuthToken = (token, stayLoggedIn) => {
    storeAuthToken(token, stayLoggedIn)
    applyAuthToken(token)

    return token ? jwt_decode(token) : undefined
}

const storeAuthToken = (token, stayLoggedIn) => {
    if (token) {
        if (stayLoggedIn) {
            localStorage.setItem("jwtToken", token)
        } else {
            sessionStorage.setItem("jwtToken", token)
        }
    } else {
        localStorage.removeItem("jwtToken")
        sessionStorage.removeItem("jwtToken")
    }
}

const applyAuthToken = token => {
    token
        /// Apply authorization token to every request if logged in
        ? authAPI.setHeader("Authorization", token)
        /// Delete auth header
        : authAPI.setHeader("Authorization", false)
}

export const useAuthTokenStore = _ => {
    const [, dispatch] = useStoreContext()
    const [isDone, setIsDone] = useState(false)

    const history = useHistory()

    useEffect(_ => {
        if (isDone) return
        /// Check for token to keep user logged in
        if (!localStorage.jwtToken && !sessionStorage.jwtToken) {
            setIsDone(true)
            return
        }

        /// Set auth token header auth
        const tokenString = localStorage.jwtToken || sessionStorage.jwtToken
        /// Decode token and get user info and exp
        const token = jwt_decode(tokenString)

        /// Check for expired token
        const currentTime = Date.now() / 1000 /// to get in milliseconds
        const invalidate = _ => {
            /// Logout user
            setAuthToken(false)
            dispatch({ type: LOGOUT_USER })

            /// Redirect to login
            history.push("/")
        }

        if (token.exp < currentTime) {
            invalidate()
        } else {
            applyAuthToken(tokenString)
            const authCheck = async _ => {
                let user

                try {
                    const { data } = await authAPI.authenticated()
                    user = data
                } catch (res) {
                    invalidate()
                }

                if (user) dispatch({ type: LOGIN_USER, payload: { token, user } })
                setIsDone(true)
            }

            authCheck()
        }
    }, [dispatch, history, isDone])

    return isDone
}

export const useIsAuthenticated = _ => {
    const [{ userAuth: { token } }] = useStoreContext()
    const isAuthenticated = token && token.exp > Date.now() / 1000 || false
    return isAuthenticated
}

export const useAuthenticatedUser = _ => {
    const [{ userAuth: { user } }] = useStoreContext()
    return user
}

export const useLogin = _ => {
    const [, dispatch] = useStoreContext()
    const history = useHistory()
    return async (credentials, stayLoggedIn) => {
        const { data: { token: tokenString, user } } = await authAPI.login(credentials)
        const token = setAuthToken(tokenString, stayLoggedIn)
        dispatch({ type: LOGIN_USER, payload: { token, user } })
        history.push('/')
        return token
    }
}

export const useLogout = _ => {
    const [, dispatch] = useStoreContext()
    const history = useHistory()

    return _ => {
        setAuthToken(false)
        dispatch({ type: LOGOUT_USER })
        history.push("/login")
    }
}