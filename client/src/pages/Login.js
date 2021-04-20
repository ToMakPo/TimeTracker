import { useRef, useState } from "react"
import { useLogin } from "../utils/auth"
import { Link } from "react-router-dom"

// import '../styles/Login.css'
import Input from "../components/Input"
import Checkbox from "../components/Checkbox"
import Toast from '../components/Toast'

const Login = _ => {
    const usernameInput = useRef('')
    const passwordInput = useRef('')
    const stayLoggedInCheckbox = useRef(false)
    const [toast, setToast] = useState()

    const login = useLogin()

    const handleSubmit = async event => {
        event.preventDefault()

        const data = {
            username: usernameInput.current.value,
            password: passwordInput.current.value
        }

        try {
            await login(data, stayLoggedInCheckbox.current.checked)

            /// User has been successfully logged in and added to state. Perform any additional actions you need here such as redirecting to a new page.
        } catch (err) {
            /// Handle error responses from the API
            
            switch (err.response?.data?.focus) {
                case 'username': usernameInput.current.focus(); break
                case 'password': passwordInput.current.focus(); break
                default: break
            }

            if (err.response?.data?.message) {
                setToast({
                    message: err.response.data.message,
                    bgColor: 'FireBrick'
                })
            } else if (err.response?.data?.default) {
                setToast({
                    message: err.response.data.default,
                    bgColor: 'DarkSlateGrey'
                })
            } else {
                console.error({err})
            }
        }
    }

    return (
        <div className='login-page'>
            <h2>Welcome Back</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    name='Username'
                    autoComplete='username'
                    autoFocus
                    ref={usernameInput}
                />
                <Input
                    name='Password'
                    type='password'
                    autoComplete='current-password'
                    ref={passwordInput}
                />
                <Checkbox
                    name='Stay Logged In'
                    ref={stayLoggedInCheckbox}
                />
                <button
                    type="submit"
                    className="bg-accept">
                    Log In
                </button>
            </form>
            <p>Don't have an account yet?
                <Link to='/signup'> Sign up</Link>
            </p>
            {toast && <Toast {...toast} setToast={setToast}/>}
        </div>
    )
}

export default Login