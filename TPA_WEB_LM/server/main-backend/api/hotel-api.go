package api

import (
	"github.com/nosurprisesplz/tpa-web-backend/controllers/hotel"
	"github.com/nosurprisesplz/tpa-web-backend/enums"
	"github.com/nosurprisesplz/tpa-web-backend/initializer"
)

func CreateHotelAPI() {
	engine := initializer.GetEngine()
	engine.POST(enums.CREATE_HOTEL, hotel.CreateHotel)
	engine.GET(enums.VIEW_ALL_HOTEL, hotel.ViewAllHotel)
	engine.POST(enums.CREATE_HOTEL_FACILITY, hotel.CreateHotelFacility)
	engine.POST(enums.CREATE_HOTEL_PICTURE, hotel.CreateHotelPicture)
	engine.GET(enums.GET_HOTEL_DETAIL, hotel.GetHotelDetail)
	engine.POST(enums.CREATE_HOTEL_ROOM_TYPE, hotel.CreateHotelRoomType)
	engine.DELETE(enums.DELETE_ROOM_TYPE, hotel.DeleteRoomType)

	// ! Rating
	engine.GET(enums.VIEW_ALL_RATING, hotel.ViewRating)
	engine.GET(enums.VIEW_RATING_BY_ID, hotel.ViewRatingByID)
	engine.PATCH(enums.UPDATE_RATING, hotel.UpdateRating)
	engine.DELETE(enums.DELETE_RATING, hotel.DeleteRating)
	engine.POST(enums.CREATE_RATING, hotel.CreateRating)

	engine.GET(enums.VIEW_ALL_HOTELROOMTYPEFACILITY, hotel.ViewHotelRoomTypeFacility)
	engine.GET(enums.VIEW_HOTELROOMTYPEFACILITY_BY_ID, hotel.ViewHotelRoomTypeFacilityByID)
	engine.PATCH(enums.UPDATE_HOTELROOMTYPEFACILITY, hotel.UpdateHotelRoomTypeFacility)
	engine.DELETE(enums.DELETE_HOTELROOMTYPEFACILITY, hotel.DeleteHotelRoomTypeFacility)
	engine.POST(enums.CREATE_HOTELROOMTYPEFACILITY, hotel.CreateHotelRoomTypeFacility)

	engine.GET(enums.VIEW_ALL_CARTHOTELTICKET, hotel.ViewCartHotelTicket)
	engine.GET(enums.VIEW_CARTHOTELTICKET_BY_ID, hotel.ViewCartHotelTicketByID)
	engine.PATCH(enums.UPDATE_CARTHOTELTICKET, hotel.UpdateCartHotelTicket)
	engine.DELETE(enums.DELETE_CARTHOTELTICKET, hotel.DeleteCartHotelTicket)
	engine.POST(enums.CREATE_CARTHOTELTICKET, hotel.CreateCartHotelTicket)
}
