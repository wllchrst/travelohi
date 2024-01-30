import { useEffect } from "react"
import { useUserAuth } from "../contexts/user-context"
import { useNavigate } from "react-router-dom"
import { IChildren } from "../interfaces/children-interface"

export default function AdminMiddleware ({children} : IChildren) {
    const user = useUserAuth().user
    const navigate = useNavigate()
    useEffect(() => {
        // if(user.Role != "admin") navigate('home')
    }, [])
    return (
        <>
            {children}
        </>
    )
}
