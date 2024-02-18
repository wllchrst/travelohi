import IAirline from "./airline-interface"
import IAirport from "./airport-interface"
import IFlightSeat from "./flight-seat-interface"
import ITransit from "./transit-interface"

export default interface IFlightResponse {
    FlightID               :string 
	AirlineRefer           :string
	AirportCodeDestination :string
	AirportCodeOrigin      :string
	DepartureTime          :Date
	ArrivalTime            :number
	SeatTotal              :number
	AirplaneCode : string
    Airline : IAirline
    AirportDestination : IAirport
    AirportOrigin : IAirport
    Transits : ITransit[]
	FlightSeats : IFlightSeat[]
}
