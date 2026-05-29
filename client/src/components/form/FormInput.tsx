import type { InputHTMLAttributes, Ref } from 'react'
import style from '../../styles/components/form/formInput.module.scss'
import Input from '../ui/Input'
import type { LucideReactType } from '../../types/lucideReactType'

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string
    labelText: string
    type: "text" | "email" | "password" | "number"
    Icon: LucideReactType
    ref?: Ref<HTMLInputElement>
    textArea?: boolean
}

const FormInput = ({ id, type, labelText, Icon, ref, ...props }: FormInputProps) => {

    return (
        <div className={style.container}>
            <label className={style.label} htmlFor={id}>{labelText}</label>
            <div className={style['input-container']}>
                <Icon
                    size={22}
                    strokeWidth={1.5}
                    className={style.icon}
                />
                <Input
                    type={type}
                    ref={ref}
                    {...props}
                />
            </div>
        </div>
    )

}

export default FormInput