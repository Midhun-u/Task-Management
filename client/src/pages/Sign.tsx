import { useCallback, useRef, type SubmitEvent } from 'react'
import AuthForm from '../components/form/AuthForm'
import { signApi } from '../api/authInstance'
import { authFailed, authRequest, authSuccess } from '../store/authSlice'
import { useAppDispatch } from '../store/hooks'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

const Sign = () => {

    const fullnameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    // Function submitting form
    const handleSubmit = useCallback(async (event: SubmitEvent) => {

        event.preventDefault()

        const fullname = fullnameRef.current?.value
        const email = emailRef.current?.value
        const password = passwordRef.current?.value

        if(!fullname || !email || !password) return

        dispatch(authRequest())
        const result = await signApi({
            email: email,
            fullname: fullname,
            password: password
        })
        if(result.success){
            dispatch(authSuccess({authToken: result.data.authToken, user: result.data.user}))
            toast.success("Account is created")
            navigate("/")
        }else{
            toast.error(result.error)
            dispatch(authFailed({errorMessage: result.error}))
        }

    }, [])

    return (
        <AuthForm
            formType='sign'
            fullnameRef={fullnameRef}
            emailRef={emailRef}
            passwordRef={passwordRef}
            onSubmit={handleSubmit}
        />
    )

}

export default Sign