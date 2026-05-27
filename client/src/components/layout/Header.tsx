import { assets } from '../../assets/assets'
import style from '../../styles/components/layout/header.module.scss'

const Header = () => {

    return (
        <header className={style.container}>
            <img
                src={assets.logo}
                className={style.logo}
            />
        </header>
    )

}

export default Header