import { useState } from "react"
import IFlightResponse from "../../interfaces/flight-response-interface"
import { FlexGap } from "../wrapper/FlexGap"
import Select from "../wrapper/select"
import { SeatType } from "../../enums/seat-type-enum"
import { AvailableFlight } from "./available-button"
import { NotAvailableButton } from "./not-available-button"
import { Title } from "../wrapper/title"
import Button from "../wrapper/button"
import { SubTitle } from "../wrapper/subtitle"
import { useUserAuth } from "../../contexts/user-context"
import { addFlightToCart } from "../../functions/flight"
import Input from "../wrapper/input"
import IFlightSeat from "../../interfaces/flight-seat-interface"
import PriceWrapper from "../wrapper/price-wrapper"

interface I {
    flight : IFlightResponse
}

export default function AddFlightToCart ({ flight } : I) {
    const [seatType, setSeatType] = useState("Business")
    const { user } = useUserAuth()
    const [extraLuggage, setextraLuggage] = useState(0)
    const [seat, setSeat] = useState<IFlightSeat>()
    const addHandle = () => {
        if(seat) {
            addFlightToCart(user, flight, seat.FlightSeatID, extraLuggage).then((result) => {
                if(result) window.location.reload()
            })
        }
    }

    return (
        <div className="flex flex-col gap-1">
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
                                alert("Cannot choose taken seat")
                            }}>
                                {seat.SeatNumber}    
                            </NotAvailableButton>}
                        </> : <></>}
                    </div>
                ))}
            </div>
            {seat ?  <div className="flex flex-col gap-1">
                <Input placeholder="Extra Luggage" name="ExtraLuggage" type="number" onChange={(o) => {
                    setextraLuggage(parseInt(o.target.value))
                }}></Input>
                <SubTitle className="w-6k">Seat Number : {seat?.SeatNumber}</SubTitle>
                <SubTitle className="w-8k">Total Price : <PriceWrapper price={seat.Price + extraLuggage}></PriceWrapper></SubTitle>
                <Button onClick={addHandle} className="w-50per">Add To Cart</Button>
            </div> : <></>}
        </div>
    )
}
