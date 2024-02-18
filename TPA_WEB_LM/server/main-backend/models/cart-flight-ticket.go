package models

import "gorm.io/gorm"

type CartFlightTicket struct {
	gorm.Model
	CartID          string `gorm:"primaryKey"`
	UserRefer       string
	FlightRefer     string
	FlightSeatRefer string
	ExtraLuggage    int
	Flight          Flight     `gorm:"foreignKey:FlightRefer"`
	FlightSeat      FlightSeat `gorm:"foreignKey:FlightSeatRefer"`
	User            User       `gorm:"foreignKey:UserRefer"`
}
