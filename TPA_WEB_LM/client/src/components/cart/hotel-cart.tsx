import ICartHotelTicketResponse from "../../interfaces/cart-hotel-response-interface"
import HotelCard from "../hotels/hotel-card"
import HotelCartCard from "../hotels/hotel-cart-card"

interface IHotelCartPage{
    carts : ICartHotelTicketResponse[]
}

export default function HotelCart({carts} : IHotelCartPage) {
    
    return (
        <div className="flex flex-col gap-1">
            {carts.map((c, i) => (
                <div key={i}>
                    <HotelCartCard cart={c}  hotel={c.Hotel}></HotelCartCard>
                </div>
            ))}
        </div>
    )
}
