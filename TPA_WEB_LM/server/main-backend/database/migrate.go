package database

import "github.com/nosurprisesplz/tpa-web-backend/models"

func Migrate() {
	db := GetDB()
	db.AutoMigrate(&models.Location{})
	db.AutoMigrate(&models.Airport{})
	db.AutoMigrate(&models.HotelPicture{})
	db.AutoMigrate(&models.Hotel{})
	db.AutoMigrate(&models.User{})
	db.AutoMigrate(&models.CreditCard{})
	db.AutoMigrate(&models.Facility{})
	db.AutoMigrate(&models.Airline{})
	db.AutoMigrate(&models.Flight{})
	db.AutoMigrate(&models.Transit{})
	db.AutoMigrate(&models.FlightSeat{})
	db.AutoMigrate(&models.Test{})
	db.AutoMigrate(&models.HotelRoomType{})
	db.AutoMigrate(&models.Promo{})
	db.AutoMigrate(&models.Rating{})
	db.AutoMigrate(&models.HotelRoomTypeFacility{})
	db.AutoMigrate(&models.CartFlightTicket{})
	db.AutoMigrate(&models.CartHotelTicket{})
	db.AutoMigrate(&models.FlightTicket{})
	db.AutoMigrate(&models.HotelTicket{})
	db.AutoMigrate(&models.Review{})
	db.AutoMigrate(&models.Rating{})
}
