import type { InputHTMLAttributes, Ref } from 'react'
import style from '../../styles/components/ui/input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    ref?: Ref<HTMLInputElement>
}

const Input = (props: InputProps) => {

    return (
        <input className={style.input}
            ref={props.ref}
            {...props}
        />
    )

}

export default Input