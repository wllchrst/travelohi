package models

type Review struct {
	ReviewID          string `gorm:"primaryKey"`
	UserID            string
	HotelID           string
	ReviewDescription string
	IsAnonymous       bool
}
