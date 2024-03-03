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
	BAN_HANDLE_USER        = "/ban_handle_user/:id"
	CREATE_PROMO           = "/create_promo"
	GET_ALL_PROMO          = "/view_promo"
	DELETE_PROMO           = "/delete_promo/:id"

	GET_USER_DETAIL = "/user/:id"
	UPDATE_PASSWORD = "/user/update"

	// ! RAting
	VIEW_ALL_RATING   = "/view_rating"
	VIEW_RATING_BY_ID = "/view_rating/:id"
	UPDATE_RATING     = "/update_rating/:id"
	DELETE_RATING     = "/delete_rating"
	CREATE_RATING     = "/create_rating"

	VIEW_ALL_HOTELROOMTYPEFACILITY   = "/view_hotelroomtypefacility"
	VIEW_HOTELROOMTYPEFACILITY_BY_ID = "/view_hotelroomtypefacility/:id"
	UPDATE_HOTELROOMTYPEFACILITY     = "/update_hotelroomtypefacility/:id"
	DELETE_HOTELROOMTYPEFACILITY     = "/delete_hotelroomtypefacility"
	CREATE_HOTELROOMTYPEFACILITY     = "/create_hotelroomtypefacility"

	VIEW_ALL_FLIGHTSEAT   = "/view_flightseat"
	VIEW_FLIGHTSEAT_BY_ID = "/view_flightseat/:id"
	UPDATE_FLIGHTSEAT     = "/update_flightseat/:id"
	DELETE_FLIGHTSEAT     = "/delete_flightseat"
	CREATE_FLIGHTSEAT     = "/create_flightseat"

	VIEW_ALL_CARTFLIGHTTICKET   = "/view_cartflightticket"
	VIEW_CARTFLIGHTTICKET_BY_ID = "/view_cartflightticket/:id"
	UPDATE_CARTFLIGHTTICKET     = "/update_cartflightticket/:id"
	DELETE_CARTFLIGHTTICKET     = "/delete_cartflightticket/:id"
	CREATE_CARTFLIGHTTICKET     = "/create_cartflightticket"

	VIEW_ALL_CARTHOTELTICKET   = "/view_carthotelticket"
	VIEW_CARTHOTELTICKET_BY_ID = "/view_carthotelticket/:id"
	UPDATE_CARTHOTELTICKET     = "/update_carthotelticket/:id"
	DELETE_CARTHOTELTICKET     = "/delete_carthotelticket"
	CREATE_CARTHOTELTICKET     = "/create_carthotelticket"

	VIEW_ALL_FLIGHTTICKET = "/view_flightticket/:userId"
	SEARCH_FLIGHTTCKET    = "/search_flightticket"
	UPDATE_FLIGHTTICKET   = "/update_flightticket/:id"
	DELETE_FLIGHTTICKET   = "/delete_flightticket"
	CREATE_FLIGHTTICKET   = "/create_flightticket/:id/:cart_id"
	BUY_FLIGHT            = "/buy_flight"

	VIEW_ALL_HOTELTICKET = "/view_hotelticket/:userId"
	SEARCH_HOTELTICKET   = "/search_hotelticket"
	UPDATE_HOTELTICKET   = "/update_hotelticket/:id"
	DELETE_HOTELTICKET   = "/delete_hotelticket"
	CREATE_HOTELTICKET   = "/create_hotelticket/:id"
	BUY_HOTEL            = "/buy_hotel"

	UPDATE_PROMO          = "/update_promo"
	HOTEL_RECOMMENDATION  = "/hotel_recommendation"
	FLIGHT_RECOMMENDATION = "/flight_recommendation"

	HISTORY_HOTEL_TICKET  = "/history_hotel_ticket/:userId"
	HISTORY_FLIGHT_TICKET = "/history_flight_ticket/:userId"

	LOGOUT = "/log_out/:id"

	VIEW_ALL_REVIEW   = "/view_review"
	VIEW_REVIEW_BY_ID = "/view_review/:id"
	UPDATE_REVIEW     = "/update_review/:id"
	DELETE_REVIEW     = "/delete_review"
	CREATE_REVIEW     = "/create_review"

	UPDATE_USER_INFORMATION = "/update_user_information"
	USER_SUBSCRIBE          = "/user_subscribe/:id"

	VIEW_ALL_CREDITCARD   = "/view_creditcard"
	VIEW_CREDITCARD_BY_ID = "/view_creditcard/:id"
	UPDATE_CREDITCARD     = "/update_creditcard/:id"
	DELETE_CREDITCARD     = "/delete_creditcard"
	CREATE_CREDITCARD     = "/create_creditcard"

	ADD_BALANCE = "/add_balance/:id"

	FILTER_FLIGHTS = "/filter-flights"
	FILTER_HOTELS  = "/filter-hotels"

	SEARCH_FLIGHTS = "/filter-flights/:query"
	SEARCH_HOTELS  = "/filter-hotels/:query"

	GET_OTP   = "/get-otp/:email"
	OTP_LOGIN = "/login-otp/:otp"

	SEARCH_RECOMMENDATION = "/search-recommendation/:email"
	SEARCH_QUERY          = "/search-query/:query"

	ADD_SEARCH_HISTORY = "/add-search-history"
	ADMIN_EMAIL        = "/admin-email"
)
