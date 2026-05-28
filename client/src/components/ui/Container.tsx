import type { ReactNode } from 'react'
import style from '../../styles/components/ui/container.module.scss'

const Container = ({children}: {children: ReactNode}) => {

    return (
        <div className={style.container}>
            <div className={style.page}>
                {children}
            </div>
        </div>
    )

}

export default Container