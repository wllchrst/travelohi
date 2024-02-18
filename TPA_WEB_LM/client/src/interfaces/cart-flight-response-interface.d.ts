import IFlightResponse from "./flight-response-interface"
import IFlightSeat from "./flight-seat-interface"
import { IUser } from "./user-interface"

export default interface ICartFlightTicketResponse {
	CartID      : string 
	UserRefer   : string
	FlightRefer : string
	FlightSeatRefer : string
	ExtraLuggage : number
    User : IUser
    Flight : IFlightResponse
	FlightSeat : IFlightSeat
}
