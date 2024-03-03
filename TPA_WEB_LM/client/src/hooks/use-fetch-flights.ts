import { useEffect, useState } from "react";
import IFlightResponse from "../interfaces/flight-response-interface";
import Service from "../utils/service";
import Paths from "../enums/api-paths";
import { Method } from "../enums/method-enum";
import IFlight from "../interfaces/flight-interface";
import IFlightFilter from "../interfaces/flight-filter-interface";

export default function useFetchFlight(){ 
    const [flights, setFlights] = useState<IFlightResponse[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const service = new Service()

    async function fetchFlight(){
        const response = await service.request<IFlightResponse[]>({
            url: Paths.GET_ALL_FLIGHT,
            method: Method.GET
        })

        console.log(response);

        if(response.success && response.data) setFlights(response.data)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchFlight()
    }, [])
    
    return { flights, isLoading}
}
