package models

type Review struct {
	UserID            string `gorm:"primaryKey"`
	HotelID           string `gorm:"primaryKey"`
	ReviewDescription string
	IsAnonymous       int
}
