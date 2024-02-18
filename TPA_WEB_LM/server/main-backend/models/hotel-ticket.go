package models

import (
	"time"
)

type HotelTicket struct {
	TicketID      string `gorm:"primaryKey"`
	PromoRefer    string
	UserRefer     string
	HotelRefer    string
	RoomTypeRefer string
	CheckInDate   time.Time
	CheckOutDate  time.Time
	Method        string
	RoomType      HotelRoomType `gorm:"foreignKey:RoomTypeRefer"`
	Hotel         Hotel         `gorm:"foreignKey:HotelRefer"`
	User          User          `gorm:"foreignKey:UserRefer"`
}
