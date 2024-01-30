import { useState } from "react"
import IFlightResponse from "../../interfaces/flight-response-interface"
import { FlexGap } from "../wrapper/FlexGap"
import Select from "../wrapper/select"
import { SeatType } from "../../enums/seat-type-enum"
import { AvailableFlight } from "./available-button"
import { NotAvailableButton } from "./not-available-button"

interface IBuyComponent {
    flight : IFlightResponse
}

export default function BuyNow ({ flight } : IBuyComponent) {
    const [seatType, setSeatType] = useState("Business")
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
                            {seat.IsAvalaible ? <AvailableFlight>
                                {seat.SeatNumber}    
                            </AvailableFlight> : <NotAvailableButton>
                                {seat.SeatNumber}    
                            </NotAvailableButton>}
                        </> : <></>}
                    </div>
                ))}
            </div>
        </div>
    )
}
