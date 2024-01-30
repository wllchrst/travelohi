import { useEffect, useState } from "react";
import { IUser } from "../interfaces/user-interface";
import Service from "../utils/service";
import Paths from "../enums/api-paths";
import { Method } from "../enums/method-enum";

export default function useGetAllUser(){
    const [users, setUsers] = useState<IUser[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const service = new Service()
    async function getUser (){
        const response = await service.request<IUser[]>({
            url: Paths.GET_ALL_USER,
            method: Method.GET
        })

        if(response.data) setUsers(response.data)
        setIsLoading(false)
    }

    useEffect(() => {
        getUser()
    }, [])

    return {users, isLoading}
}
