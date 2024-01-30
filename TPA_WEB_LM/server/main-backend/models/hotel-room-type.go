package models

type HotelRoomType struct {
	RoomTypeID              string `gorm:"primaryKey"`
	PictureLink             string
	HotelID                 string
	Description             string
	Price                   int
	HotelRoomTypeFacilities []HotelRoomTypeFacility `gorm:"foreignKey:RoomTypeRefer;constraint:OnDelete:CASCADE;"`
}
