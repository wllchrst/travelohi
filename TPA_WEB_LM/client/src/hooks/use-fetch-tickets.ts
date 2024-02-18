import { useEffect, useState } from "react";
import Service from "../utils/service";
import IFlightTicketResponse from "../interfaces/flight-ticket-response-interface";
import IHotelTicketResponse from "../interfaces/hotel-ticket-response-interface";
import Paths from "../enums/api-paths";
import { Method } from "../enums/method-enum";
import { useUserAuth } from "../contexts/user-context";
import IHotelTicket from "../interfaces/hotel-ticket-interface";
import IFetchSearch from "../interfaces/fetch-search-interface";

export default function useFetchTickets(){
    const { user } = useUserAuth();
    const [flights, setFlights] = useState<IFlightTicketResponse[]>([])
    const [hotels, setHotels] = useState<IHotelTicketResponse[]>([])
    const [findHotel, setFindHotel] = useState('')
    const [findFlight, setFindFlight] = useState('')
    const service = new Service();

    async function fetchTicket(){
        const response = await service.request<IFlightTicketResponse[]>({
            url: Paths.VIEW_ALL_FLIGHTTICKET,
            method: Method.GET,
        }, user.ID);

        if(response.success && response.data) setFlights(response.data);

        const second = await service.request<IHotelTicketResponse[]>({
            url: Paths.VIEW_ALL_HOTELTICKET,
            method: Method.GET
        }, user.ID);

        if(second.success && second.data) setHotels(second.data);
    }

    async function searchHotel(search : IFetchSearch){
        const response = await service.request<IHotelTicketResponse[]>({
            url: Paths.SEARCH_HOTELTICKET,
            method: Method.POST
        }, '', search)

        if(response.success && response.data) setHotels(response.data)
    }

    async function searchFlight(search : IFetchSearch){
        console.log(search);
        const response = await service.request<IFlightTicketResponse[]>({
            url: Paths.SEARCH_FLIGHTTCKET,
            method: Method.POST
        }, '', search)   

        if(response.success && response.data) setFlights(response.data)
    }

    useEffect(() => {
        fetchTicket();
    }, [])

    useEffect(() => {
        const search : IFetchSearch = {
            UserID: user.ID,
            Query: findHotel,
            Past : false 
        }

        searchHotel(search)
    }, [findHotel])

    useEffect(() => {
        const search : IFetchSearch = { 
            UserID : user.ID,
            Past : false,
            Query: findFlight
        }

        searchFlight(search)
    }, [findFlight])

    return { flights, hotels, setFindFlight, setFindHotel }
}
