package facade

import "github.com/nosurprisesplz/tpa-web-backend/api"

func CraeteAPIFacade() {
	api.CreateHotelAPI()
	api.CreateUserAPI()
	api.CreateLocationAPI()
	api.CreateAirportAPI()
	api.CreateFlightAPI()
	api.CreateTransactionsAPI()
}
