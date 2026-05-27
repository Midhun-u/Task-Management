import { useCallback, useEffect, useState, type ReactNode } from "react"
import { getProfileApi } from "../../api/authInstance"
import { useNavigate } from "react-router"

const ProtectedRoutes = ({
    children
}: {
    children: ReactNode
}) => {

    const [authenticated, setAuthenticated] = useState<boolean>(false)
    const navigate = useNavigate()

    // Function for checking authentication
    const handleCheckAuthentication = useCallback(async () => {

        const result = await getProfileApi()
        if(result.success){
            setAuthenticated(true)
        }else{
            navigate("/login")
            setAuthenticated(false)
        }

    }, [])

    useEffect(() => {
        handleCheckAuthentication()
    }, [handleCheckAuthentication])

    return (
        authenticated
        ?
        children
        :
        null
    )

}

export default ProtectedRoutes