import IFlightResponse from "./flight-response-interface"
import IFlightSeat from "./flight-seat-interface"
import { IUser } from "./user-interface"

export default interface IFlightTicketResponse{ 
    TicketID        : string 
	UserRefer       : string
	FlightRefer     : string
	FlightSeatRefer : string
	ExtraLuggage    : int
	Method          : string
	Flight          : IFlightResponse
	FlightSeat      : IFlightSeat
	User            : IUser
}
