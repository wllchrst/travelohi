package models

import "time"

type Transit struct {
	TransitID           string `gorm:"primaryKey"`
	FlightID            string
	AirportTransitRefer string
	From                time.Time
	Until               time.Time
	AirportTransit      Airport `gorm:"foreignKey:AirportTransitRefer"`
}
