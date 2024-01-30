import ILocation from "./location-interface"

export default interface IAirport {
	AirportCode : string 
	AirportName : string 
	LocationID  : string
	Location    : ILocation
}

