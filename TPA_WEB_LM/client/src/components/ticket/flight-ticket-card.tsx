import { dateConvert, timeConvert } from "../../game/util"
import IFlightTicketResponse from "../../interfaces/flight-ticket-response-interface"
import { HotelImageDiv } from "../wrapper/DivForImage"
import { FlexGap } from "../wrapper/FlexGap"
import PriceWrapper from "../wrapper/price-wrapper"
import { SubTitle } from "../wrapper/subtitle"

interface I {
    flightTicket : IFlightTicketResponse
    onHistory : boolean
}
export default function FlightTicketCard ({ flightTicket, onHistory } : I) {
    return (
        <div>
            <div className="general-container">
                <div className="general-left-container">
                    <div className="airline-container">
                        <HotelImageDiv> 
                            <img src={flightTicket.Flight.Airline.PictureLink} alt="" />
                        </HotelImageDiv>
                    </div>
                    <p>{flightTicket.Flight.Airline.AirlineName}</p>
                </div>
                <div className="general-right-container">
                    {/* time */}
                    <div className="time-information-container">
                        <div className="time-container">
                            <p>{timeConvert(flightTicket.Flight.DepartureTime)}</p>
                            <p className="airport-name">{flightTicket.Flight.AirportOrigin.AirportName}</p>
                        </div>
                        <hr />
                        <div className="time-container">
                            <p>{timeConvert(flightTicket.Flight.DepartureTime, flightTicket.Flight.ArrivalTime)}</p>
                            <p className="airport-name">{flightTicket.Flight.AirportDestination.AirportName}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <FlexGap>
                    <p className="large">Flight ID : </p>
                    <p className="large">{flightTicket.Flight.FlightID}</p>
                </FlexGap>
                <FlexGap>
                    <p className="large">Boarding Date : </p>
                    <p className="large">{dateConvert(flightTicket.Flight.DepartureTime)}</p>
                </FlexGap>
                <FlexGap>
                    <p className="large">Extra Luggage : </p>
                    <p className="large">{flightTicket.ExtraLuggage}</p>
                </FlexGap>
                <FlexGap>
                    <p className="large">Flight Seat : </p>
                    <p className="large">{flightTicket.FlightSeat.SeatClass}, Number {flightTicket.FlightSeat.SeatNumber}</p>
                </FlexGap>
                {onHistory && <div>
                    
                </div>}
            </div>
        </div>
    )
}
