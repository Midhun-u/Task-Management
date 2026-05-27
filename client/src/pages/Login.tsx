import { useRef, type SubmitEvent } from "react"
import AuthForm from "../components/form/AuthForm"
import { useAppDispatch } from "../store/hooks"
import { authFailed, authRequest, authSuccess } from "../store/authSlice"
import { loginApi } from "../api/authInstance"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"

const Login = () => {

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    // Function for submitting form
    const handleSubmit = async (event: SubmitEvent) => {

        event.preventDefault()

        const email = emailRef.current?.value
        const password = passwordRef.current?.value

        if(!email || !password) return

        dispatch(authRequest())
        const result = await loginApi({
            email: email,
            password: password
        })

        if(result.success){
            navigate("/")
            dispatch(authSuccess({user: result.user, authToken: result.authToken}))
            toast.success("Successfully logined")
        }else{
            toast.error(result.error)
            dispatch(authFailed({errorMessage: result.error}))
        }

    }

    return (
       <AuthForm
            formType="login"
            onSubmit={handleSubmit}
            emailRef={emailRef}
            passwordRef={passwordRef}
       />
    )

}

export default Login