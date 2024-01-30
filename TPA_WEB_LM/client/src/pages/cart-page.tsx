import { useState } from "react"
import { Container } from "../components/wrapper/container"
import Loading from "../components/wrapper/loading"
import { Title } from "../components/wrapper/title"
import useFetchCart from "../hooks/use-fetch-cart"
import FlightCart from "../components/cart/flight-cart"
import HotelCart from "../components/cart/hotel-cart"
import { SubTitle } from "../components/wrapper/subtitle"

export default function Cart () {
    const { flightTotalPrice, flightCarts, isLoading, hotelCarts, hotelTotalPrice } = useFetchCart()
    const [price, setPrice] = useState(flightTotalPrice)
    const [flightCart, setFlightCart] = useState(true)

    if(isLoading) return <Loading></Loading>

    return (
        <div className="p-5 flex flex-col gap-2">
            <Container className="p-2">
                <div className="flex justify-between">
                    <div className="flex gap-3">
                        <Title onClick={() => {
                            setFlightCart(true) 
                            setPrice(flightTotalPrice)
                        }} className="underline-effects">Flight Cart</Title>
                        <Title onClick={() => {
                            setFlightCart(false)
                            setPrice(hotelTotalPrice)
                        }} className="underline-effects">Hotel Cart</Title>
                    </div>
                    <SubTitle>Total : {flightCart ? flightTotalPrice : hotelTotalPrice}</SubTitle>
                </div>
            </Container>]
            {flightCart ? <FlightCart totalPrice={flightTotalPrice} carts={flightCarts}></FlightCart> : <HotelCart carts={hotelCarts}></HotelCart>}
        </div>
        
    )
}
