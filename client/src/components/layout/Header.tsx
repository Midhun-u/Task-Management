import { assets } from '../../assets/assets'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { switchTheme } from '../../store/themeSlice'
import style from '../../styles/components/layout/header.module.scss'
import {
    Moon as DarkThemeIcon,
    Sun as WhiteThemeIcon
} from 'lucide-react'

const Header = () => {

    const { theme } = useAppSelector(state => state.theme)
    const dispatch = useAppDispatch()

    const handleSwitchTheme = () => {
        dispatch(switchTheme())
    }

    return (
        <header className={style.container}>
            <img
                src={assets.logo}
                className={style.logo}
            />
            <div onClick={handleSwitchTheme} className={style['theme-icon-container']}>
                {
                    theme === "dark"
                        ?
                        <WhiteThemeIcon
                            size={23}
                            strokeWidth={1.7}
                        />
                        :
                        <DarkThemeIcon
                            size={23}
                            strokeWidth={1.7}
                        />
                }
            </div>
        </header>
    )

}

export default Header