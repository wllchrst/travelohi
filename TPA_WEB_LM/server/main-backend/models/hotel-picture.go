package models

type HotelPicture struct {
	PictureID   string `gorm:"primaryKey"`
	HotelID     string
	PictureLink string
}
