import { useState } from "react"
import { Container } from "../components/wrapper/container"
import Loading from "../components/wrapper/loading"
import { Title } from "../components/wrapper/title"
import useFetchCart from "../hooks/use-fetch-cart"
import FlightCart from "../components/cart/flight-cart"
import HotelCart from "../components/cart/hotel-cart"

export default function Cart () {
    const { flightTotalPrice, flightCarts, isLoading, hotelCarts } = useFetchCart()
    const [flightCart, setFlightCart] = useState(true)

    if(isLoading) return <Loading></Loading>

    return (
        <div className="p-5 flex flex-col gap-2">
            <Container className="p-2">
                <div className="flex gap-3">
                    <Title onClick={() => setFlightCart(true)} className="underline-effects">Flight Cart</Title>
                    <Title onClick={() => setFlightCart(false)} className="underline-effects">Hotel Cart</Title>
                </div>
            </Container>
            {flightCart ? <FlightCart carts={flightCarts}></FlightCart> : <HotelCart carts={hotelCarts}></HotelCart>}
        </div>
        
    )
}
