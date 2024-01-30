package models

import (
	"time"
)

type CartHotelTicket struct {
	CartID        string `gorm:"primaryKey"`
	UserRefer     string
	HotelRefer    string
	RoomTypeRefer string
	CheckInDate   time.Time
	CheckOutDate  time.Time
	RoomType      HotelRoomType `gorm:"foreignKey:RoomTypeRefer"`
	Hotel         Hotel         `gorm:"foreignKey:HotelRefer"`
	User          User          `gorm:"foreignKey:UserRefer"`
}
