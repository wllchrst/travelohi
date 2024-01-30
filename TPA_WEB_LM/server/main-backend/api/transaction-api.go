package api

import (
	"github.com/nosurprisesplz/tpa-web-backend/controllers/promo"
	"github.com/nosurprisesplz/tpa-web-backend/enums"
	"github.com/nosurprisesplz/tpa-web-backend/initializer"
)

func CreateTransactionsAPI() {
	engine := initializer.GetEngine()
	engine.POST(enums.CREATE_PROMO, promo.CreatePromo)
	engine.GET(enums.GET_ALL_PROMO, promo.GetAllPromo)
	engine.DELETE(enums.DELETE_PROMO, promo.DeletePromo)
}
