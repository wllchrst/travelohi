import { useState } from "react"
import { useUserAuth } from "../../contexts/user-context"
import { PaymentMethod } from "../../enums/payment-enum"
import { buyFlight } from "../../functions/flight"
import ICartFlightTicketResponse from "../../interfaces/cart-flight-response-interface"
import { FlexGap } from "../wrapper/FlexGap"
import Button from "../wrapper/button"
import { GreenButton } from "../wrapper/green-button"
import PriceWrapper from "../wrapper/price-wrapper"
import Select from "../wrapper/select"
import { SubTitle } from "../wrapper/subtitle"

interface I  {
    cart : ICartFlightTicketResponse
}

export default function FlightCheckOut ({cart} :I) {
    const { user } = useUserAuth()
    const [method, setMethod] = useState(PaymentMethod.credit)
    const buyHandle = () => {
        buyFlight(user, cart.FlightRefer, cart.FlightSeatRefer, cart.ExtraLuggage, method, cart.CartID).then((result) => {
            if(result) window.location.reload()
        })
    }

    return (
        <div className="flex flex-col gap-1">
            <FlexGap className="justify-between">
                <FlexGap>
                    <SubTitle>Seat Price:</SubTitle>
                    <SubTitle><PriceWrapper price={cart.FlightSeat.Price}></PriceWrapper></SubTitle>
                </FlexGap>
                <FlexGap>
                    <SubTitle>Extra Luggage:</SubTitle>
                    <SubTitle><PriceWrapper price={cart.ExtraLuggage}></PriceWrapper></SubTitle>
                </FlexGap>
            </FlexGap>
            <FlexGap className="justify-between">
                <FlexGap>
                    <SubTitle>Total Price:</SubTitle>
                    <SubTitle><PriceWrapper price={cart.ExtraLuggage + cart.FlightSeat.Price}></PriceWrapper></SubTitle>
                </FlexGap>
                <FlexGap>
                    <SubTitle>Seat Number:</SubTitle>
                    <SubTitle>{cart.FlightSeat.SeatNumber}</SubTitle>
                </FlexGap>
            </FlexGap>
            <Select onChange={(o) => {
                setMethod(o.target.value as PaymentMethod)
            }}>
                <option value={PaymentMethod.credit}>{PaymentMethod.credit}</option>
                <option value={PaymentMethod.wallet}>{PaymentMethod.wallet}</option>
            </Select>
            <GreenButton onClick={() => buyHandle()}>Buy</GreenButton>
        </div>
    )
}
