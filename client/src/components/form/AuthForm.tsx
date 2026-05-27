import FormInput from './FormInput'
import style from '../../styles/components/form/authForm.module.scss'
import {
    UserIcon,
    MailIcon as EmailIcon,
    Lock as PasswordIcon
} from 'lucide-react'
import { useId, type SubmitEvent, type Ref } from 'react'
import Button from '../ui/Button'
import { useAppSelector } from '../../store/hooks'
import { Link } from 'react-router'

interface AuthFormProps {
    formType: "sign" | "login"
    fullnameRef?: Ref<HTMLInputElement>
    emailRef: Ref<HTMLInputElement>
    passwordRef: Ref<HTMLInputElement>,
    onSubmit: (event: SubmitEvent) => void
}

const AuthForm = ({ formType, fullnameRef, emailRef, passwordRef, onSubmit }: AuthFormProps) => {

    const fullnameId = useId()
    const emailId = useId()
    const passwordId = useId()
    const { loading } = useAppSelector(state => state.auth)

    return (
        <section className={style.container}>
            <form onSubmit={onSubmit} className={style.form}>
                <h1 className={style['form-title']}>
                    {
                        formType === "sign"
                            ?
                            <>Sign In</>
                            :
                            <>Login In</>
                    }
                </h1>
                <div className={style['form-input-container']}>
                    {
                        formType === "sign"
                            ?
                            <FormInput
                                id={fullnameId}
                                labelText="Fullname"
                                type='text'
                                placeholder='Enter your fullname'
                                Icon={UserIcon}
                                ref={fullnameRef}
                                minLength={3}
                                maxLength={30}
                                required
                                aria-invalid
                            />
                            :
                            null
                    }
                    <FormInput
                        id={emailId}
                        labelText="Email"
                        type='email'
                        placeholder='Enter your email address'
                        Icon={EmailIcon}
                        ref={emailRef}
                        required
                        aria-invalid
                    />
                    <FormInput
                        id={passwordId}
                        labelText="Password"
                        type='password'
                        placeholder='Enter your password'
                        Icon={PasswordIcon}
                        ref={passwordRef}
                        required
                        maxLength={50}
                        minLength={6}
                        aria-invalid
                    />
                </div>
                <Button
                    name={formType === "sign" ? "Sign In" : "Login In"}
                    type='submit'
                    disabled={loading}
                    className={style['primary-button']}
                />
                <Link to={formType === "sign" ? "/login" : "/sign"} className={style['nav-link']}>
                    {
                        formType === "sign"
                            ?
                            <>
                                Already have an account ?
                            </>
                            :
                            <>
                                Don't have an account ?
                            </>
                    }
                </Link>
            </form>
        </section>
    )

}

export default AuthForm