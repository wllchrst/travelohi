package enums

const (
	REGISTER               = "/register"
	LOGIN                  = "/login"
	AUTHENTICATION         = "/auth/:token"
	CREATE_HOTEL           = "/create-hotel"
	VIEW_ALL_HOTEL         = "/view-hotel"
	GET_ALL_LOCATION       = "/get_locations"
	GET_ALL_AIRPORT        = "/get_airport"
	CREATE_HOTEL_PICTURE   = "/create_hotel_picture"
	CREATE_HOTEL_FACILITY  = "/create_hotel_facility"
	CREATE_AIRLINE         = "/create_airline"
	GET_ALL_FLIGHT         = "/view_flight"
	GET_ALL_AIRLINE        = "/view_airline"
	CREATE_FLIGHT          = "/create_flight"
	GET_HOTEL_DETAIL       = "/view-hotel/:id"
	GET_FLIGHT_DETAIL      = "/view-flight/:id"
	CREATE_HOTEL_ROOM_TYPE = "create_room_type"
	CREATE_FLIGHT_TRANSIT  = "/create_transit"
	DELETE_ROOM_TYPE       = "/delete_room_type/:id"
	GET_ALL_USER           = "/get_all_user"
	BAN_HANDLE_USER = "/ban_handle_user/:id"
	CREATE_PROMO = "/create_promo"
	GET_ALL_PROMO = "/view_promo"
	DELETE_PROMO= "/delete_promo/:id"

	// ! RAting
	VIEW_ALL_RATING = "/view_rating"
	VIEW_RATING_BY_ID = "/view_rating/:id"
	UPDATE_RATING = "/update_rating/:id"
	DELETE_RATING = "/delete_rating"
	CREATE_RATING = "/create_rating"

	VIEW_ALL_HOTELROOMTYPEFACILITY = "/view_hotelroomtypefacility"
	VIEW_HOTELROOMTYPEFACILITY_BY_ID = "/view_hotelroomtypefacility/:id"
	UPDATE_HOTELROOMTYPEFACILITY = "/update_hotelroomtypefacility/:id"
	DELETE_HOTELROOMTYPEFACILITY = "/delete_hotelroomtypefacility"
	CREATE_HOTELROOMTYPEFACILITY = "/create_hotelroomtypefacility"

	VIEW_ALL_FLIGHTSEAT = "/view_flightseat"
	VIEW_FLIGHTSEAT_BY_ID = "/view_flightseat/:id"
	UPDATE_FLIGHTSEAT = "/update_flightseat/:id"
	DELETE_FLIGHTSEAT = "/delete_flightseat"
	CREATE_FLIGHTSEAT = "/create_flightseat"

	VIEW_ALL_CARTFLIGHTTICKET = "/view_cartflightticket"
	VIEW_CARTFLIGHTTICKET_BY_ID = "/view_cartflightticket/:id"
	UPDATE_CARTFLIGHTTICKET = "/update_cartflightticket/:id"
	DELETE_CARTFLIGHTTICKET = "/delete_cartflightticket"
	CREATE_CARTFLIGHTTICKET = "/create_cartflightticket"

	VIEW_ALL_CARTHOTELTICKET = "/view_carthotelticket"
	VIEW_CARTHOTELTICKET_BY_ID = "/view_carthotelticket/:id"
	UPDATE_CARTHOTELTICKET = "/update_carthotelticket/:id"
	DELETE_CARTHOTELTICKET = "/delete_carthotelticket"
	CREATE_CARTHOTELTICKET = "/create_carthotelticket"
)