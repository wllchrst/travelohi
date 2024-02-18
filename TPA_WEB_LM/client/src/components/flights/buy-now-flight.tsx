import { useState } from "react"
import IFlightResponse from "../../interfaces/flight-response-interface"
import { FlexGap } from "../wrapper/FlexGap"
import Select from "../wrapper/select"
import { SeatType } from "../../enums/seat-type-enum"
import { AvailableFlight } from "./available-button"
import { NotAvailableButton } from "./not-available-button"
import Seat from "../../interfaces/seat-interface"
import IFlightSeat from "../../interfaces/flight-seat-interface"
import { GreenButton } from "../wrapper/green-button"
import { PaymentMethod } from "../../enums/payment-enum"
import Input from "../wrapper/input"
import { buyNowFlight } from "../../functions/flight"
import { useUserAuth } from "../../contexts/user-context"
import { useNavigate } from "react-router-dom"

interface IBuyComponent {
    flight : IFlightResponse
}

export default function BuyNow ({ flight } : IBuyComponent) {
    const [method, setMethod] = useState(PaymentMethod.credit)
    const [seatType, setSeatType] = useState("Business")
    const [seat, setSeat] = useState<null | IFlightSeat>()
    const [luggage, setLuggage] = useState(0)
    const { user } = useUserAuth()
    const navigate = useNavigate()

    function buyHandle(){
        if(seat) buyNowFlight(flight, luggage, seat, method, user).then((result) => {
            if(result) navigate('/ticket')
        })
    }

    return (
        <div>
            <FlexGap className="mt-2">
                <Select onChange={(event) => setSeatType(event.target.value)}>
                    <option value={SeatType.Business}>Business</option>
                    <option value={SeatType.FirstClass}>First Class</option>
                    <option value={SeatType.Economy}>Economy</option>
                </Select>
            </FlexGap>

            <div className="flex flex-row wrap gap-05 mt-1 center">
                {flight.FlightSeats.map((seat, index) => (
                    <div key={index}>
                        {seat.SeatClass === seatType ? <>
                            {seat.IsAvalaible ? <AvailableFlight onClick={() => {
                                setSeat(seat)
                            }}>
                                {seat.SeatNumber}    
                            </AvailableFlight> : <NotAvailableButton onClick={() => {
                                alert("cannot choose non available seat");
                            }}>
                                {seat.SeatNumber}    
                            </NotAvailableButton>}
                        </> : <></>}
                    </div>
                ))}
            </div>

            {seat ? <div className="mt-1 flex flex-col gap-1">
                <Input placeholder="Extra Luggage" onChange={(event) => {
                    setLuggage(parseInt(event.target.value))
                }}></Input>
                <Select onChange={(o) => {
                    setMethod(o.target.value as PaymentMethod)
                }}>
                    <option value={PaymentMethod.credit}>{PaymentMethod.credit}</option>
                    <option value={PaymentMethod.wallet}>{PaymentMethod.wallet}</option>
                </Select>
                <GreenButton onClick={() => buyHandle()}>Buy</GreenButton>
            </div> : <>
            </>}
        </div>
    )
}
