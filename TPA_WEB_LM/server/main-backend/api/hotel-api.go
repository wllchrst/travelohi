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

	engine.GET(enums.VIEW_ALL_HOTELTICKET, hotel.ViewHotelTicket)
	engine.POST(enums.SEARCH_HOTELTICKET, hotel.SearchHotelTicket)
	engine.PATCH(enums.UPDATE_HOTELTICKET, hotel.UpdateHotelTicket)
	engine.DELETE(enums.DELETE_HOTELTICKET, hotel.DeleteHotelTicket)
	engine.POST(enums.CREATE_HOTELTICKET, hotel.CreateHotelTicket)
	engine.POST(enums.BUY_HOTEL, hotel.BuyHotel)
	engine.GET(enums.HOTEL_RECOMMENDATION, hotel.GetHotelRecommendation)

	engine.GET(enums.HISTORY_HOTEL_TICKET, hotel.HistoryViewHotelTicket)

	engine.GET(enums.VIEW_ALL_REVIEW, hotel.ViewReview)
	engine.GET(enums.VIEW_REVIEW_BY_ID, hotel.ViewReviewByID)
	engine.PATCH(enums.UPDATE_REVIEW, hotel.UpdateReview)
	engine.DELETE(enums.DELETE_REVIEW, hotel.DeleteReview)
	engine.POST(enums.CREATE_REVIEW, hotel.CreateReview)

	engine.GET(enums.FILTER_HOTELS, hotel.FilterHotel)
	engine.GET(enums.SEARCH_HOTELS, hotel.SearchHotel)
}
