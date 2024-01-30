package models

type Rating struct {
	UserID  string `gorm:"primaryKey"`
	HotelID string `gorm:"primaryKey"`
	Rate    int
}
