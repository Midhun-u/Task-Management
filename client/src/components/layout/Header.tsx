import { assets } from '../../assets/assets'
import style from '../../styles/components/layout/header.module.scss'
import {
    Moon as DarkThemeIcon,
    Sun as WhiteThemeIcon
} from 'lucide-react'

const Header = () => {

    return (
        <header className={style.container}>
            <img
                src={assets.logo}
                className={style.logo}
            />
            <div className={style['theme-icon-container']}>
                <DarkThemeIcon
                />
            </div>
        </header>
    )

}

export default Header