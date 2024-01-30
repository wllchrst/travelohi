package models

type Airline struct {
	AirlineCode string `gorm:"primaryKey"`
	AirlineName string
	PictureLink string
}
