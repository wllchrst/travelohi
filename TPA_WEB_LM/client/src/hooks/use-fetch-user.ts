import Cookies from "js-cookie"
import Paths from "../enums/api-paths"
import { Method } from "../enums/method-enum"
import { IEndpoint } from "../interfaces/endpoint-interface"
import Service from "../utils/service"
import { useContext, useEffect } from "react"
import { useUserAuth } from "../contexts/user-context"
import { IUser } from "../interfaces/user-interface"

export default function useFetchUser () { 
    const service = new Service()
    const userContext = useUserAuth()
    const fetchUserData = async () => {
        const token = Cookies.get('token')
        const endpoint : IEndpoint = {
            url : Paths.AUTH + token,
            method: Method.GET 
        }
        const result = await service.request<IUser>(endpoint)
        if(result.data) {
            console.log('FETCHING THE DATA');
            userContext.setUser(result.data)
            userContext.setAuth(true)
        }
        else {
            userContext.setAuth(false)
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [])
}
