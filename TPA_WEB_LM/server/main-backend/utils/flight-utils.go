package utils

import (
	"errors"
	"fmt"
	"time"

	"github.com/nosurprisesplz/tpa-web-backend/database"
	"github.com/nosurprisesplz/tpa-web-backend/models"
)

func ValidateFlight(flight models.Flight) error {
	if flight.FlightID == "" {
		return errors.New("flightID is required")
	}

	if flight.AirplaneCode == "" {
		return errors.New("airplane code is required")
	}

	if flight.AirlineRefer == "" {
		return errors.New("airlineRefer is required")
	}

	if flight.AirportCodeDestination == "" {
		return errors.New("airportCodeDestination is required")
	}

	if flight.AirportCodeOrigin == "" {
		return errors.New("airportCodeOrigin is required")
	}

	if flight.DepartureTime.IsZero() {
		return errors.New("departureTime is required")
	}

	if flight.DepartureTime.Before(time.Now().UTC()) {
		fmt.Println(flight.DepartureTime.After(time.Now().UTC()))
		return errors.New("flight departure time must be in the future")
	}

	if flight.ArrivalTime <= 0 {
		return errors.New("arrivalTime must be greater than zero")
	}
	return nil
}

func ValidateTransit(transit models.Transit) error {
	if transit.TransitID == "" {
		return errors.New("transitID is required")
	}

	if transit.FlightID == "" {
		return errors.New("flightID is required")
	}

	if transit.AirportTransitRefer == "" {
		return errors.New("airportTransitRefer is required")
	}

	if !transit.Until.After(transit.From) {
		return errors.New("from must be before until")
	}

	now := time.Now().UTC()

	if transit.From.Before(now) {
		return errors.New("from must be in the future")
	}

	if transit.Until.Before(now) {
		return errors.New("until must be in the future")
	}

	return nil
}

func ValidateFlightSeat(flightSeat models.FlightSeat) error {
	if flightSeat.FlightSeatID == "" {
		return errors.New("flightSeatID is required")
	}

	if flightSeat.FlightID == "" {
		return errors.New("flightID is required")
	}

	// Assuming IsAvailable is optional (no validation needed)

	if flightSeat.SeatNumber <= 0 {
		return errors.New("seatNumber must be greater than zero")
	}

	if flightSeat.SeatClass == "" {
		return errors.New("seatClass is required")
	}

	if flightSeat.Price <= 0 {
		return errors.New("flight seat price must be greater than zero")
	}

	return nil
}

func ValidateAirline(airline models.Airline) error {
	if airline.AirlineCode == "" {
		return errors.New("airlineCode is required")
	}

	if len(airline.AirlineCode) != 2 {
		return errors.New("airline code Length must be 2")
	}

	if airline.AirlineName == "" {
		return errors.New("airlineName is required")
	}

	if airline.PictureLink == "" {
		return errors.New("picture link is requiered")
	}

	// You can add more validation rules based on your requirements.

	return nil
}

func ValidateCartFlightTicket(cartFlightTicket models.CartFlightTicket) error {
	if cartFlightTicket.CartID == "" {
		return errors.New("cartID is required")
	}

	if cartFlightTicket.UserRefer == "" {
		return errors.New("userRefer is required")
	}

	if cartFlightTicket.FlightRefer == "" {
		return errors.New("flightRefer is required")
	}

	if cartFlightTicket.FlightSeatRefer == "" {
		return errors.New("flightSeatRefer is required")
	}

	if cartFlightTicket.ExtraLuggage < 0 {
		return errors.New("extra luggage cannot be minus")
	}

	db := database.GetDB()
	var seat models.FlightSeat

	result := db.Find(&seat, "flight_seat_id = ?", cartFlightTicket.FlightSeatRefer)

	if result.Error != nil {
		return errors.New("flight seat was not found")
	}

	if !seat.IsAvalaible {
		return errors.New("flight seat is not available")
	}

	return nil
}
