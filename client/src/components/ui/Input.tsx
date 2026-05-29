import type { InputHTMLAttributes, Ref } from 'react'
import style from '../../styles/components/ui/input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    ref?: Ref<HTMLInputElement>
}

const Input = ({ref, ...props}: InputProps) => {

    return (
        <input className={style.input}
            {...props}
            ref={ref}
        />
    )

}

export default Input