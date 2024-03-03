package models

type FlightFilter struct {
	IsTransit       bool
	NumberOfTransit int
	Duration        int
	PriceMinimum    int
	PriceMaximum    int
}
