package models

type Hotel struct {
	HotelID         string `gorm:"primaryKey"`
	HotelName       string
	Description     string
	LocationID      string
	HotelRoomType   []HotelRoomType
	Location        Location
	HotelPictures   []HotelPicture
	HotelFacilities []Facility
	Ratings         []Rating
	Reviews         []Review
}
