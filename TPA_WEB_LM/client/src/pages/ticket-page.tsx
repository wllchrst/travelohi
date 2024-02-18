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

export default function TicketPage () {
    const { flights, hotels, setFindHotel, setFindFlight } = useFetchTickets();
    const [flightView , setFlightView] = useState(true)

    return (
        <div className="p-5 flex flex-col gap-2">
            <Container className="p-2">
                <div className="flex justify-between">
                    <div className="flex gap-3">
                        <Title onClick={() => {
                            setFlightView(true) 
                        }} className="underline-effects">Flight Tickets</Title>
                        <Title onClick={() => {
                            setFlightView(false)
                        }} className="underline-effects">Hotel Tickets</Title>
                    </div>
                    <Title>Ticket</Title>
                </div>
            </Container>
            <Container className="p-2">
                {flightView ? <FlightTicketPage setFindFlight={setFindFlight} onHistory={false} flightTickets={flights}></FlightTicketPage> : <HotelTicketPage setFindHotel={setFindHotel} onHistory={false} hotelTickets={hotels}></HotelTicketPage>}
            </Container>
        </div>
    )
}
