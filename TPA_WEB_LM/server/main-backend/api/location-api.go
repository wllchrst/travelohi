package api

import (
	"github.com/nosurprisesplz/tpa-web-backend/controllers/location"
	"github.com/nosurprisesplz/tpa-web-backend/enums"
	"github.com/nosurprisesplz/tpa-web-backend/initializer"
)

func CreateLocationAPI(){
	engine := initializer.GetEngine()
	engine.GET(enums.GET_ALL_LOCATION, location.GetAllLocation)
}
