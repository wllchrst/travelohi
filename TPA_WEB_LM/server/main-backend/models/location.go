package models

type Location struct {
	LocationID  string `gorm:"primaryKey" faker:"uuid_hyphenated"`
	CityName    string `faker:"first_name"`
	CountryName string `faker:"last_name"`
	Address     string `faker:"mac_address"`
}
