import { useEffect, useState } from "react";
import IHotelReponse from "../interfaces/hotel-response-interface";
import Service from "../utils/service";
import Paths from "../enums/api-paths";
import { Method } from "../enums/method-enum";


export default function useFecthHotel(){
    const [hotels, setHotels] = useState<IHotelReponse[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const service = new Service()

    function fetchHotels(){
        service.request<IHotelReponse[]>({
            url: Paths.VIEW_ALL_HOTEL,
            method: Method.GET
        }).then((result) => {
            if(result.data) setHotels(result.data)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        fetchHotels(); 
    }, [])

    return {hotels, isLoading}
}
