package models

import "gorm.io/gorm"

type CartFlightTicket struct {
	gorm.Model
	CartID      string `gorm:"primaryKey"`
	UserRefer   string
	FlightRefer string
	Flight      Flight `gorm:"foreignKey:FlightRefer"`
	User        User   `gorm:"foreignKey:UserRefer"`
}
