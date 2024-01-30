import { useEffect } from "react"
import { useUserAuth } from "../contexts/user-context"
import { useNavigate } from "react-router-dom"
import { IChildren } from "../interfaces/children-interface"
import Unauthorized from "../components/unauthorized-component"

export default function AdminMiddleware ({children} : IChildren) {
    const { user, IsFetching }= useUserAuth()
    const navigate = useNavigate()
    useEffect(() => {
        console.log(IsFetching);
        if(user.Role != "admin" && !IsFetching) navigate("/page-not-found")
    }, [IsFetching])
    return (
        <>
            {children}
        </>
    )
}
