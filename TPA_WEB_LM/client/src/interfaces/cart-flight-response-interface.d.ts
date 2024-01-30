import IFlightResponse from "./flight-response-interface"
import { IUser } from "./user-interface"

export default interface ICartFlightTicketResponse {
	CartID      : string 
	UserRefer   : string
	FlightRefer : string
    User : IUser
    Flight : IFlightResponse
}
