package models

type HotelFilter struct {
	Filtering    bool
	MediumRating bool
	HighRating   bool
	PriceMinimum int
	PriceMaximum int
}
