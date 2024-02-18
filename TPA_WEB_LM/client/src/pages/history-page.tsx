import { useState } from "react"
import { Container } from "../components/wrapper/container"
import Loading from "../components/wrapper/loading"
import { Title } from "../components/wrapper/title"
import useFetchCart from "../hooks/use-fetch-cart"
import FlightCart from "../components/cart/flight-cart"
import HotelCart from "../components/cart/hotel-cart"
import { SubTitle } from "../components/wrapper/subtitle"
import useFetchTickets from "../hooks/use-fetch-tickets"
import FlightTicketPage from "../components/ticket/flight-ticket-page"
import HotelTicketPage from "../components/ticket/hotel-ticket-page"
import useFetchHistory from "../hooks/use-fetch-history"

export default function HistoryPage () {
    const { flights, hotels, setFindHotel, setFindFlight } = useFetchHistory();
    const [flightView , setFlightView] = useState(true)

    return (
        <div className="p-5 flex flex-col gap-2">
            <Container className="p-2 flex">
                <div className="flex justify-between">
                    <div className="flex gap-3">
                        <Title onClick={() => {
                            setFlightView(true) 
                        }} className="underline-effects">Flight Tickets</Title>
                        <Title onClick={() => {
                            setFlightView(false)
                        }} className="underline-effects">Hotel Tickets</Title>
                    </div>
                    <Title className="">History</Title>
                </div>
            </Container>
            <Container className="p-2">
                {flightView ? <FlightTicketPage setFindFlight={setFindFlight} onHistory={true} flightTickets={flights}></FlightTicketPage> : <HotelTicketPage setFindHotel={setFindHotel} onHistory={true} hotelTickets={hotels}></HotelTicketPage>}
            </Container>
        </div>
    )
}
