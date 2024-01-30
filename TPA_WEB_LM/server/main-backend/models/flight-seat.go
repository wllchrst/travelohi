package models

type FlightSeat struct {
	FlightSeatID string `gorm:"primaryKey"`
	FlightID     string
	IsAvalaible  bool
	SeatNumber   int
	SeatClass    string
	Price        int
}
