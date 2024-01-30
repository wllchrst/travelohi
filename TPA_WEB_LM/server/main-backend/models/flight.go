package models

import "time"

type Flight struct {
	FlightID               string `gorm:"primaryKey"`
	AirlineRefer           string
	AirportCodeDestination string
	AirportCodeOrigin      string
	DepartureTime          time.Time
	ArrivalTime            int
	Price                  int
	Airline                Airline `gorm:"foreignKey:AirlineRefer"`
	AirportDestination     Airport `gorm:"foreignKey:AirportCodeDestination"`
	AirportOrigin          Airport `gorm:"foreignKey:AirportCodeOrigin"`
	Transits               []Transit
	FlightSeats            []FlightSeat
}
