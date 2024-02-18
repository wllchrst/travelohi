package utils

import (
	"errors"
	"time"

	"github.com/nosurprisesplz/tpa-web-backend/database"
	"github.com/nosurprisesplz/tpa-web-backend/enums"
	"github.com/nosurprisesplz/tpa-web-backend/models"
)

func ValidateFlightTicket(flightTicket models.FlightTicket) error {
	if flightTicket.TicketID == "" {
		return errors.New("TicketID is required")
	}

	if flightTicket.UserRefer == "" {
		return errors.New("UserRefer is required")
	}

	if flightTicket.FlightRefer == "" {
		return errors.New("FlightRefer is required")
	}

	if flightTicket.FlightSeatRefer == "" {
		return errors.New("FlightSeatRefer is required")
	}

	db := database.GetDB()
	var seat models.FlightSeat

	result := db.Find(&seat, "flight_seat_id = ?", flightTicket.FlightSeatRefer)

	if result.Error != nil {
		return result.Error
	}

	if !seat.IsAvalaible {
		return errors.New("seat is not available")
	}

	if flightTicket.ExtraLuggage < 0 {
		return errors.New("ExtraLuggage must be a non-negative number")
	}

	if flightTicket.Method != enums.Credit && flightTicket.Method != enums.Wallet {
		return errors.New("payment method must be credit or hi wallet")
	}

	var flight models.Flight

	db.Find(&flight, "flight_id = ?", flightTicket.FlightRefer)

	currentDate := time.Now()

	if flight.DepartureTime.Before(currentDate) {
		return errors.New("Flight must be in the future")
	}

	return nil
}
