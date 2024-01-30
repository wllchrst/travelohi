import ICartFlightTicketResponse from "../../interfaces/cart-flight-response-interface"
import FlightCard from "../flights/flight-card"

interface IFlightCartPage {
    carts : ICartFlightTicketResponse[]
}


export default function FlightCart ({carts } : IFlightCartPage ) {
    return (
        <div className="flex flex-col gap-1">
            {carts.map((c, i) => (
                <FlightCard flight={c.Flight}></FlightCard>
            ))}
        </div>
    )
}
