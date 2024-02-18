package utils

import (
	"errors"
	"time"

	"github.com/nosurprisesplz/tpa-web-backend/models"
)

func ValidateHotel(hotel models.Hotel) error {
	if hotel.HotelID == "" {
		return errors.New("hotelID is required")
	}

	if hotel.HotelName == "" {
		return errors.New("hotelName is required")
	}

	if hotel.Description == "" {
		return errors.New("description is required")
	}

	if hotel.LocationID == "" {
		return errors.New("locationID is required")
	}

	return nil
}

func ValidateHotelPicture(hotelPicture models.HotelPicture) error {
	if hotelPicture.PictureID == "" {
		return errors.New("pictureID is required")
	}

	if hotelPicture.HotelID == "" {
		return errors.New("hotelID is required")
	}

	if hotelPicture.PictureLink == "" {
		return errors.New("pictureLink is required")
	}

	return nil
}

func ValidateFacility(facility models.Facility) error {
	if facility.FacilityID == "" {
		return errors.New("facilityID is required")
	}

	if facility.HotelID == "" {
		return errors.New("hotelID is required")
	}

	if facility.FacilityDescription == "" {
		return errors.New("facilityDescription is required")
	}

	return nil
}

func ValidateHotelRoomType(roomType models.HotelRoomType) error {
	if roomType.RoomTypeID == "" {
		return errors.New("roomTypeID is required")
	}

	if roomType.PictureLink == "" {
		return errors.New("pictureLink is required")
	}

	if roomType.HotelID == "" {
		return errors.New("hotelID is required")
	}

	if roomType.Description == "" {
		return errors.New("description is required")
	}

	if roomType.Price <= 0 {
		return errors.New("price must be greater than zero")
	}

	return nil
}

func ValidateHotelRoomTypeFacility(roomTypeFacility models.HotelRoomTypeFacility) error {
	if roomTypeFacility.RoomTypeFacilityID == "" {
		return errors.New("roomTypeFacilityID is required")
	}

	if roomTypeFacility.RoomTypeRefer == "" {
		return errors.New("roomTypeRefer is required")
	}

	if roomTypeFacility.FacilityID == "" {
		return errors.New("facilityID is required")
	}

	// Assuming Facility validation is done separately

	return nil
}

func ValidateCartHotelTicket(cartHotelTicket models.CartHotelTicket) error {
	if cartHotelTicket.CartID == "" {
		return errors.New("cartID is required")
	}

	if cartHotelTicket.UserRefer == "" {
		return errors.New("userRefer is required")
	}

	if cartHotelTicket.HotelRefer == "" {
		return errors.New("hotelRefer is required")
	}

	if cartHotelTicket.RoomTypeRefer == "" {
		return errors.New("roomTypeRefer is required")
	}

	if cartHotelTicket.CheckInDate.IsZero() {
		return errors.New("checkInDate is required")
	}

	if cartHotelTicket.CheckOutDate.IsZero() {
		return errors.New("checkOutDate is required")
	}

	if cartHotelTicket.CheckOutDate.Before(cartHotelTicket.CheckInDate) {
		return errors.New("checkOutDate must be after checkInDate")
	}
	now := time.Now().UTC()

	if cartHotelTicket.CheckInDate.Before(now) {
		return errors.New("checkInDate must be in the future")
	}

	if cartHotelTicket.CheckOutDate.Before(now) {
		return errors.New("checkOutDate must be in the future")
	}

	return nil
}

func ValidateUpdateHotelCart(updateHotelCart models.UpdateHotelCart) error {
	// Get current date
	currentDate := time.Now()

	// Check if CheckInDate is before CheckOutDate
	if updateHotelCart.CheckInDate.After(updateHotelCart.CheckOutDate) {
		return errors.New("check-in date must be before check-out date")
	}

	// Check if CheckInDate is not in the past
	if updateHotelCart.CheckInDate.Before(currentDate) {
		return errors.New("check-in date must be in the future")
	}

	// Check if CheckOutDate is not in the past
	if updateHotelCart.CheckOutDate.Before(currentDate) {
		return errors.New("check-out date must be in the future")
	}

	// Validation passed
	return nil
}

func ValidateHotelTicket(ticket models.HotelTicket) error {
	if ticket.TicketID == "" {
		return errors.New("TicketID is required")
	}

	if ticket.UserRefer == "" {
		return errors.New("UserRefer is required")
	}

	if ticket.HotelRefer == "" {
		return errors.New("HotelRefer is required")
	}

	if ticket.RoomTypeRefer == "" {
		return errors.New("RoomTypeRefer is required")
	}

	if ticket.CheckInDate.IsZero() {
		return errors.New("CheckInDate is required")
	}

	if ticket.CheckOutDate.IsZero() {
		return errors.New("CheckOutDate is required")
	}

	currentDate := time.Now()

	if ticket.CheckInDate.Before(currentDate) && ticket.CheckOutDate.Before(currentDate) {
		return errors.New("both date should be in the future")
	}

	if ticket.CheckOutDate.Before(ticket.CheckInDate) {
		return errors.New("checkout date must be after check in date")
	}

	if ticket.Method == "" {
		return errors.New("method is required")
	}

	return nil
}

// ValidateRating validates the fields of the Rating struct
func ValidateRating(rating models.Rating) error {
	// Check if RatingID is empty
	if rating.RatingID == "" {
		return errors.New("RatingID cannot be empty")
	}

	// Check if UserID is empty
	if rating.UserID == "" {
		return errors.New("UserID cannot be empty")
	}

	// Check if HotelID is empty
	if rating.HotelID == "" {
		return errors.New("HotelID cannot be empty")
	}

	// Check if Rate is within valid range (0-5)
	if rating.Rate <= 0 || rating.Rate > 5 {
		return errors.New("Rate must be between 1 and 5")
	}

	return nil
}

// ValidateReview validates the fields of the Review struct
func ValidateReview(review models.Review) error {
	// Check if ReviewID is empty
	if review.ReviewID == "" {
		return errors.New("ReviewID cannot be empty")
	}

	// Check if UserID is empty
	if review.UserID == "" {
		return errors.New("UserID cannot be empty")
	}

	// Check if HotelID is empty
	if review.HotelID == "" {
		return errors.New("HotelID cannot be empty")
	}

	// Check if ReviewDescription is empty
	if review.ReviewDescription == "" {
		return errors.New("ReviewDescription cannot be empty")
	}

	return nil
}
