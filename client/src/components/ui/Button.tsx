import type { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    name: string
}

const Button = ({name, ...props}: ButtonProps) => {

    return (
        <button
            {...props}
        >
            <span>{name}</span>
        </button>
    )

}

export default Button