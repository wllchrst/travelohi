package api

import (
	"github.com/nosurprisesplz/tpa-web-backend/controllers/hotel"
	"github.com/nosurprisesplz/tpa-web-backend/controllers/promo"
	"github.com/nosurprisesplz/tpa-web-backend/controllers/user"
	"github.com/nosurprisesplz/tpa-web-backend/enums"
	"github.com/nosurprisesplz/tpa-web-backend/initializer"
)

func CreateTransactionsAPI() {
	engine := initializer.GetEngine()
	engine.POST(enums.CREATE_PROMO, promo.CreatePromo)
	engine.GET(enums.GET_ALL_PROMO, promo.GetAllPromo)
	engine.DELETE(enums.DELETE_PROMO, promo.DeletePromo)
	engine.POST(enums.UPDATE_PROMO, promo.UpdatePromo)

	engine.GET(enums.VIEW_ALL_RATING)
	engine.GET(enums.VIEW_RATING_BY_ID)
	engine.PATCH(enums.UPDATE_RATING)
	engine.DELETE(enums.DELETE_RATING)
	engine.POST(enums.CREATE_RATING, hotel.CreateRating)

	engine.GET(enums.VIEW_ALL_CREDITCARD, user.ViewCreditCard)
	engine.GET(enums.VIEW_CREDITCARD_BY_ID, user.ViewCreditCardByID)
	engine.PATCH(enums.UPDATE_CREDITCARD, user.UpdateCreditCard)
	engine.DELETE(enums.DELETE_CREDITCARD, user.DeleteCreditCard)
	engine.POST(enums.CREATE_CREDITCARD, user.CreateCreditCard)
}
