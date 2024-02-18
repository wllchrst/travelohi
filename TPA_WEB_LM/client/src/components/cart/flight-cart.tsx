import ICartFlightTicketResponse from "../../interfaces/cart-flight-response-interface"
import FlightCard from "../flights/flight-card"
import FlightDetailCard from "../flights/flight-detail-card"
import FlightCartDetailCard from "./flight-cart-detail"

interface IFlightCartPage {
    carts : ICartFlightTicketResponse[]
}


export default function FlightCart ({carts } : IFlightCartPage ) {

    return (
        <div className="flex flex-col gap-1">
            {carts.map((c, i) => (
                <FlightCartDetailCard cart={c} flight={c.Flight}></FlightCartDetailCard>
            ))}
        </div>
    )
}
