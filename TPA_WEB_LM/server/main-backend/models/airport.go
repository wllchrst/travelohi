package models

type Airport struct {
	AirportCode string `gorm:"primaryKey" faker:"uuid_hyphenated"`
	AirportName string `faker:"first_name"`
	LocationID  string
	Location    Location
}
