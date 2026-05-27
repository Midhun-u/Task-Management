import { useCallback, useEffect, useState } from "react"
import { headerNavs } from "../../utils/headerNavs"
import { NavLink } from "react-router"
import style from '../../styles/components/layout/headerNav.module.scss'

const HeaderNav = () => {

    const [pathname, setPathname] = useState<string>("")

    // Function for checking if current nav is active
    const isActive = useCallback((route: string) => {

        if (route === "/" && pathname === "/") {
            return true
        } else if (route !== "/" && pathname.includes(route)) {
            return true
        } else {
            return false
        }

    }, [pathname])

    useEffect(() => {
        const currentPathname = new URL(window.location.href).pathname
        setPathname(currentPathname)
    }, [window.location.href])

    return (
        <>
            {
                headerNavs.map((nav, index) => (
                    <NavLink
                        end
                        className={isActive(nav.route) ? style['active-nav'] : style['nav']}
                        to={nav.route}
                        key={index}
                    >
                        {nav.title}
                    </NavLink>
                ))
            }
        </>
    )

}

export default HeaderNav