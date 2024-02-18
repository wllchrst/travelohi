package models

type Rating struct {
	RatingID string `gorm:"primaryKey"`
	UserID   string
	HotelID  string
	Rate     int
}
