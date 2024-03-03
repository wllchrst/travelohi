import { useEffect, useState } from "react";
import IHotelReponse from "../interfaces/hotel-response-interface";
import Service from "../utils/service";
import Paths from "../enums/api-paths";
import { Method } from "../enums/method-enum";
import IFlightFilter from "../interfaces/flight-filter-interface";
import IHotelFIlter from "../interfaces/hotel-filter-inteface";


export default function useFecthHotel(){
    const [hotels, setHotels] = useState<IHotelReponse[]>([])
    const [filter, setFilter] = useState({} as IHotelFIlter)
    const [isLoading, setIsLoading] = useState(true)
    const service = new Service()

    async function fetchHotels(){
        const response = await service.request<IHotelReponse[]>({
            url: Paths.VIEW_ALL_HOTEL,
            method: Method.GET
        })

        if(response.data) setHotels(response.data)

        setIsLoading(false)
    }

    async function fetchFilter(filter : IHotelFIlter){
        console.log(filter);
        const response = await service.request<IHotelReponse[]>( {
            url: Paths.FILTER_HOTELS,
            method: Method.GET
        }, '', {}, filter)

        console.log("from response");
        console.log(response.data);
    }

    useEffect(() => {
        fetchHotels(); 
    }, [])

    useEffect(() => {
        fetchFilter(filter)
    }, [filter])
    

    return { hotels, isLoading, setFilter, setHotels }
}
