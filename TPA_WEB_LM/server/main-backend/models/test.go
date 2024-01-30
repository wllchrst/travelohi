package models

type Test struct {
	TestID    string `gorm:"primaryKey"`
	AirlineRefer string 
	Airline   Airline `gorm:"foreignKey:AirlineRefer"`
}
