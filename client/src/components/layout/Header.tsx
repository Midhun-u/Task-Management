import { assets } from '../../assets/assets'
import style from '../../styles/components/layout/header.module.scss'
import {
    MenuIcon,
    X as CloseIcon
} from 'lucide-react'
import HeaderNav from './HeaderNav'
import { useState } from 'react'

const Header = () => {

    const [showSidebar, setShowSidebar] = useState<boolean>(false)

    return (
        <header className={style.container}>
            <img
                src={assets.logo}
                className={style.logo}
            />
            <nav className={style['nav-container']}>
                <HeaderNav
                />
            </nav>
            <MenuIcon
                strokeWidth={1.7}
                className={style['menu-icon']}
                onClick={() => setShowSidebar(true)}
            />
            <div className={showSidebar ? style['show-side-bar'] : style['side-bar']}>
                <CloseIcon
                    strokeWidth={1.7}
                    className={style['close-icon']}
                    onClick={() => setShowSidebar(false)}
                />
                <nav className={style['side-bar-nav']}>
                    <HeaderNav
                    />
                </nav>
            </div>
        </header>
    )

}

export default Header