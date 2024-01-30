package api

import (
	"github.com/nosurprisesplz/tpa-web-backend/controllers/flights"
	"github.com/nosurprisesplz/tpa-web-backend/enums"
	"github.com/nosurprisesplz/tpa-web-backend/initializer"
)

func CreateFlightAPI() {
	engine := initializer.GetEngine()
	engine.GET(enums.GET_ALL_FLIGHT, flights.ViewAllFlight)
	engine.POST(enums.CREATE_FLIGHT, flights.CreateNewFlight)
	engine.POST(enums.CREATE_FLIGHT_TRANSIT, flights.CreateTransits)
	engine.GET(enums.GET_FLIGHT_DETAIL, flights.GetFlightDetail)
	engine.GET("/view_transit", flights.ViewAllTransit)

	engine.GET(enums.VIEW_ALL_FLIGHTSEAT, flights.ViewFlightSeat)
	engine.GET(enums.VIEW_FLIGHTSEAT_BY_ID, flights.ViewFlightSeatByID)
	engine.PATCH(enums.UPDATE_FLIGHTSEAT, flights.UpdateFlightSeat)
	engine.DELETE(enums.DELETE_FLIGHTSEAT, flights.DeleteFlightSeat)
	engine.POST(enums.CREATE_FLIGHTSEAT, flights.CreateFlightSeat)

	engine.GET(enums.VIEW_ALL_CARTFLIGHTTICKET, flights.ViewCartFlightTicket)
	engine.GET(enums.VIEW_CARTFLIGHTTICKET_BY_ID, flights.ViewCartFlightTicketByID)
	engine.PATCH(enums.UPDATE_CARTFLIGHTTICKET, flights.UpdateCartFlightTicket)
	engine.DELETE(enums.DELETE_CARTFLIGHTTICKET, flights.DeleteCartFlightTicket)
	engine.POST(enums.CREATE_CARTFLIGHTTICKET, flights.CreateCartFlightTicket)
}
