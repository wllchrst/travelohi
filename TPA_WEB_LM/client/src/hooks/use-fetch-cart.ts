import { useEffect, useState } from "react";
import { useUserAuth } from "../contexts/user-context";
import ICartFlightTicketResponse from "../interfaces/cart-flight-response-interface";
import Service from "../utils/service";
import Paths from "../enums/api-paths";
import { Method } from "../enums/method-enum";
import ICartHotelTicket from "../interfaces/cart-hotel-interface";
import ICartHotelTicketResponse from "../interfaces/cart-hotel-response-interface";
import HotelDetail from "../admin-page/hotel-detail-page";

export default function useFetchCart () {
    const { user } = useUserAuth()
    const [isLoading, setisLoading] = useState(true)
    const [flightCarts, setCartFlights] = useState<ICartFlightTicketResponse[]>([])
    const [hotelCarts, setHotelCarts] = useState<ICartHotelTicketResponse[]>([])
    const [flightTotalPrice, setflightTotalPrice] = useState(0)
    const [hotelTotalPrice, sethotelTotalPrice] = useState(0)
    const service = new Service()

    async function fetchCart() {
        await service.request<ICartFlightTicketResponse[]>({
            url: Paths.VIEW_CARTFLIGHTTICKET_BY_ID,
            method: Method.GET
        }, user.ID).then((result) => {
            if(result.data) setCartFlights(result.data)
        })

        await service.request<ICartHotelTicketResponse[]>({
            url: Paths.VIEW_CARTHOTELTICKET_BY_ID,
            method: Method.GET
        }, user.ID).then((result) => {
            if(result.data) setHotelCarts(result.data)
        })

        setisLoading(false)
    }


    function countTotal() {
        let counter = 0
        for(const flight of flightCarts) {
            counter += flight.Flight.FlightSeats[0].Price
        }
        setflightTotalPrice(counter)

        counter = 0
        for(const hotel of hotelCarts) {
            counter += hotel.RoomType.Price
        }

        console.log(counter);

        sethotelTotalPrice(counter)
    }


    useEffect(() => {
        fetchCart()
    }, [])
    

    useEffect(() => {
        countTotal()
    }, [flightCarts])
    

    return {isLoading, flightCarts, flightTotalPrice, hotelCarts, hotelTotalPrice }
}
