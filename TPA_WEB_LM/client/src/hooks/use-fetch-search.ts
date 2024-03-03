import { useEffect, useState } from "react";
import IHotelReponse from "../interfaces/hotel-response-interface";
import IFlightResponse from "../interfaces/flight-response-interface";
import Service from "../utils/service";
import Paths from "../enums/api-paths";
import { Method } from "../enums/method-enum";
import IUserSearch from "../interfaces/search-interface";
import { useUserAuth } from "../contexts/user-context";

export default function useFetchSearch(query : string) {
    const [flights, setFlights] = useState<IFlightResponse[]>([])
    const [hotels, setHotels] = useState<IHotelReponse[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const service = new Service()
    const { user } = useUserAuth()


    async function fetchFlight(){
        const response = await service.request<IFlightResponse[]>({
            url: Paths.SEARCH_FLIGHTS,
            method: Method.GET
        }, query)

        if(response.data) setFlights(response.data)
        else setFlights([])
    }

    async function fetchHotel(){
        const response = await service.request<IHotelReponse[]>({
            url: Paths.SEARCH_HOTELS,
            method: Method.GET
        }, query)

        if(response.data) setHotels(response.data)
        else setHotels([])
    }

    async function addSearchHistory(){
        const search : IUserSearch = {
            Email: user.Email,
            SearchQuery: query
        }
        const response = await service.request({
            url: Paths.ADD_SEARCH_HISTORY,
            method: Method.POST
        }, '', search)

        console.log('adding search history');
        console.log(response);
    }

    useEffect(() => {
        addSearchHistory()
    }, [])
    

    useEffect(() => {
        fetchHotel();
        fetchFlight();
    }, [])
    

    return { isLoading, hotels, flights}
}
