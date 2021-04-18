import { useRef } from "react"
import { useLogin } from "../utils/auth"
import { Link } from "react-router-dom"

// import '../styles/Login.css'
import Input from "../components/Input"
import Checkbox from "../components/Checkbox"

const Login = _ => {
    const usernameInput = useRef('')
    const passwordInput = useRef('')
    const stayLoggedInCheckbox = useRef(false)

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
            if (err.response && err.response.data) {
                // swal({
                //     title: "Login Unsuccessful",
                //     text: err.response.data.default || err.response.data.password,
                //     icon: "error",
                // })
            }
        }
    }

    return (
        <>
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
        </>
    )
}

export default Login