import IAirport from "./airport-interface"

export default interface ITransit {
	TransitID           :string 
	FlightID            :string
	AirportTransitRefer :string
	From                :Date
	Until               :Date
	AirportTransit      : IAirport
}
