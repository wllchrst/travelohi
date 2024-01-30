const host = "http://localhost:8080"

enum Paths { 
    REGISTER = host + '/register',
    LOGIN = host + '/login',
    AUTH = host + '/auth/',
    VIEW_ALL_HOTEL = host + "/view-hotel",
GET_LOCATIONS = host + '/get_locations',
    CREATE_HOTEL   = host + "/create-hotel",
    CREATE_HOTEL_PICTURE= host + "/create_hotel_picture",
	CREATE_HOTEL_FACILITY = host + "/create_hotel_facility",
    CREATE_AIRLINE=host +  "/create_airline",
    GET_ALL_AIRLINE       = host + "/view_airline",
    GET_ALL_AIRPORT       = host + "/get_airport" ,
    CREATE_FLIGHT         = host + "/create_flight",
    GET_ALL_FLIGHT        = host+"/view_flight",
    GET_HOTEL_DETAIL = host + "/view-hotel",
    CREATE_HOTEL_ROOM_TYPE = host + "/create_room_type",
    CREATE_FLIGHT_TRANSIT = host + "/create_transit",GET_FLIGHT_DETAIL= host + "/view-flight",
    DELETE_ROOM_TYPE = host + "/delete_room_type",
    GET_ALL_USER           = host + "/get_all_user",
    BAN_HANDLE_USER = host + "/ban_handle_user",
    CREATE_PROMO = host + "/create_promo",
    GET_ALL_PROMO = host + "/view_promo",
    DELETE_PROMO= host + "/delete_promo",

    VIEW_ALL_HOTELROOMTYPEFACILITY = host + "/view_hotelroomtypefacility",
    VIEW_HOTELROOMTYPEFACILITY_BY_ID = host + "/view_hotelroomtypefacility",
    UPDATE_HOTELROOMTYPEFACILITY = host + "/update_hotelroomtypefacility",
    DELETE_HOTELROOMTYPEFACILITY = host + "/delete_hotelroomtypefacility",
    CREATE_HOTELROOMTYPEFACILITY = host + "/create_hotelroomtypefacility",

    VIEW_ALL_FLIGHTSEAT = host + "/view_flightseat",
    VIEW_FLIGHTSEAT_BY_ID = host + "/view_flightseat",
    UPDATE_FLIGHTSEAT = host + "/update_flightseat",
    DELETE_FLIGHTSEAT = host + "/delete_flightseat",
    CREATE_FLIGHTSEAT = host + "/create_flightseat",
    TEST =  host + "/create_flightseatasdfadsf",

    VIEW_ALL_CARTFLIGHTTICKET = host + "/view_cartflightticket",
    VIEW_CARTFLIGHTTICKET_BY_ID = host + "/view_cartflightticket",
    UPDATE_CARTFLIGHTTICKET = host + "/update_cartflightticket",
    DELETE_CARTFLIGHTTICKET = host + "/delete_cartflightticket",
    CREATE_CARTFLIGHTTICKET = host + "/create_cartflightticket",

    VIEW_ALL_CARTHOTELTICKET = host + "/view_carthotelticket",
    VIEW_CARTHOTELTICKET_BY_ID = host + "/view_carthotelticket",
    UPDATE_CARTHOTELTICKET = host + "/update_carthotelticket",
    DELETE_CARTHOTELTICKET = host + "/delete_carthotelticket",
    CREATE_CARTHOTELTICKET = host + "/create_carthotelticket"
}


export default Paths
