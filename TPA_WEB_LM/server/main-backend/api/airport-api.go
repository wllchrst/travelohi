package api

import (
	"github.com/gin-gonic/gin"
	"github.com/nosurprisesplz/tpa-web-backend/controllers/airport"
	"github.com/nosurprisesplz/tpa-web-backend/database"
	"github.com/nosurprisesplz/tpa-web-backend/enums"
	"github.com/nosurprisesplz/tpa-web-backend/initializer"
	"github.com/nosurprisesplz/tpa-web-backend/models"
)

func CreateAirportAPI (){
	engine := initializer.GetEngine()
	engine.POST(enums.CREATE_AIRLINE, airport.CreateAirline)
	engine.GET(enums.GET_ALL_AIRPORT, airport.GetAllAirport)
	engine.GET(enums.GET_ALL_AIRLINE, airport.GetAllAirline)
	engine.GET("/test", func(context *gin.Context) {
		var tests []models.Test
		db := database.GetDB()
		db.Preload("Airline").Find(&tests)
		context.JSON(200, gin.H{
			"data": tests,
		})
	})
}
