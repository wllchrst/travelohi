import { useEffect, useState } from "react";
import IPromo from "../interfaces/promo-interface";
import Service from "../utils/service";
import Paths from "../enums/api-paths";
import { Method } from "../enums/method-enum";

export default function useFetchPromos() { 
    const [promos, setPromos] = useState<IPromo[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const service = new Service()

    function fetchPromo (){
        service.request<IPromo[]>({
            url: Paths.GET_ALL_PROMO,
            method: Method.GET
        }).then((result) => {
            if(result.data) setPromos(result.data)
            setIsLoading(false)
        }) 
    }

    useEffect(() => {
        fetchPromo()
    }, [])

    return {promos, isLoading}
}
