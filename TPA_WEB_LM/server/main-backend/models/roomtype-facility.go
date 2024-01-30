package models

type HotelRoomTypeFacility struct {
	RoomTypeFacilityID string `gorm:"primaryKey"`
	RoomTypeRefer      string
	FacilityID         string
	Facility           Facility
}
