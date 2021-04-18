import { useRef, useState } from 'react'
import { useLogin } from '../utils/auth'
import { Link } from 'react-router-dom'
import authAPI from '../utils/authAPI'

// import '../styles/Signup.css'
import Input from '../components/Input'
import Checkbox from '../components/Checkbox'
import Toast from '../components/Toast'

const Signup = _ => {
    const nameInput = useRef('')
    const usernameInput = useRef('')
    const passwordInput = useRef('')
    const confirmInput = useRef('')
    const emailInput = useRef('')
    const stayLoggedInCheckbox = useRef(false)
    const [toast, setToast] = useState()

    const login = useLogin()

    const handleSubmit = async event => {
        event.preventDefault()

        const data = {
            name: nameInput.current.value,
            email: emailInput.current.value,
            username: usernameInput.current.value,
            password: passwordInput.current.value,
            confirm: confirmInput.current.value
        }

        try {
            // Register the user.
            await authAPI.register(data)

            // User has been successfully registered, now log them in with the same information.
            await login(data, stayLoggedInCheckbox.current.checked)

            // User has been successfully registered, logged in and added to state. Perform any additional actions you need here such as redirecting to a new page.
        } catch (err) {
            // Handle error responses from the API. This will include
            
            switch (err.response?.data?.focus) {
                case 'name': nameInput.current.focus(); break
                case 'email': emailInput.current.focus(); break
                case 'username': usernameInput.current.focus(); break
                case 'password': passwordInput.current.focus(); break
                case 'confirm': confirmInput.current.focus(); break
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
        <>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    name='Name'
                    autoComplete='name'
                    autoFocus
                    ref={nameInput}
                />
                <Input
                    name='Username'
                    autoComplete='username'
                    ref={usernameInput}
                />
                <Input
                    name='Password'
                    type='password'
                    autoComplete='new-password'
                    ref={passwordInput}
                />
                <Input
                    name='Confirm Password'
                    type='password'
                    autoComplete='none'
                    ref={confirmInput}
                />
                <Input
                    name='Email'
                    autoComplete='email'
                    ref={emailInput}
                />
                <Checkbox
                    name='Stay Logged In'
                    ref={stayLoggedInCheckbox}
                />
                <button
                    type='submit'
                    className='bg-accept'>
                    Submit
                </button>
            </form>
            <p>Already have an account?
                <Link to='/login'> Login</Link>
            </p>
            {toast && <Toast {...toast} setToast={setToast}/>}
        </>
    )
}

export default Signup