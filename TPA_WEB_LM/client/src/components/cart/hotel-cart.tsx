import ICartHotelTicketResponse from "../../interfaces/cart-hotel-response-interface"
import HotelCard from "../hotels/hotel-card"

interface IHotelCartPage{
    carts : ICartHotelTicketResponse[]
}

export default function HotelCart({carts} : IHotelCartPage) {
    
    return (
        <div className="flex flex-col gap-1">
            {carts.map((c, i) => (
                <HotelCard inDetail={true} hotel={c.Hotel}></HotelCard>
            ))}
        </div>
    )
}
