package models

import "gorm.io/gorm"

type FlightTicket struct {
	gorm.Model
	TicketID        string `gorm:"primaryKey"`
	UserRefer       string
	FlightRefer     string
	FlightSeatRefer string
	ExtraLuggage    int
	Method          string
	Flight          Flight     `gorm:"foreignKey:FlightRefer"`
	FlightSeat      FlightSeat `gorm:"foreignKey:FlightSeatRefer"`
	User            User       `gorm:"foreignKey:UserRefer"`
}
