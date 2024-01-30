import ICartFlightTicketResponse from "../../interfaces/cart-flight-response-interface"
import FlightCard from "../flights/flight-card"
import FlightDetailCard from "../flights/flight-detail-card"

interface IFlightCartPage {
    carts : ICartFlightTicketResponse[]
    totalPrice : number
}


export default function FlightCart ({carts } : IFlightCartPage ) {
    return (
        <div className="flex flex-col gap-1">
            {carts.map((c, i) => (
                <FlightDetailCard inCart={true} flight={c.Flight}></FlightDetailCard>
            ))}
        </div>
    )
}
