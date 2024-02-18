import { useEffect, useState } from "react";
import IHotelReponse from "../interfaces/hotel-response-interface";
import IFlightResponse from "../interfaces/flight-response-interface";
import Service from "../utils/service";
import Paths from "../enums/api-paths";
import { Method } from "../enums/method-enum";

export default function useFetchRecommendation(){
    const [hotels, setHotels] = useState<IHotelReponse[]>([])
    const [flights, setFlights] = useState<IFlightResponse[]>([])
    const [isLoading, setisLoading] = useState(true)
    const service = new Service()

    async function fetch(){
        const flightResponse = await service.request<IFlightResponse[]>({
            url: Paths.FLIGHT_RECOMMENDATION,
            method: Method.GET
        })

        if(flightResponse.success && flightResponse.data) setFlights(flightResponse.data)
        else alert(flightResponse.message)

        const hotelResponse = await service.request<IHotelReponse[]>({
            url: Paths.HOTEL_RECOMMENDATION,
            method: Method.GET
        })

        if(hotelResponse.success && hotelResponse.data) setHotels(hotelResponse.data)
        else alert(hotelResponse.message)

        setisLoading(false)

    }

    useEffect(() => {
        fetch()
    }, [])
    

    return { hotels, flights, isLoading }
}
