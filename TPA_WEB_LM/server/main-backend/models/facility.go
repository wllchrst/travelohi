package models

type Facility struct {
	FacilityID          string `gorm:"primaryKey"`
	HotelID             string
	FacilityDescription string
}
