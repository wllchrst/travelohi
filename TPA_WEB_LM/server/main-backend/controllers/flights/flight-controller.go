package flights

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nosurprisesplz/tpa-web-backend/database"
	"github.com/nosurprisesplz/tpa-web-backend/models"
)

func ViewAllFlight(context *gin.Context) {
	var flights []models.Flight

	db := database.GetDB()

	// db.Preload("Airline").Preload("AirportDestination").Preload("AirportDestination.Location").Preload("AirportOrigin").Preload("AiportOrigin.Location").Find(&flights)

	db.Preload("Transits").Preload("Transits.AirportTransit").Preload("Transits.AirportTransit.Location").Preload("AirportDestination").Preload("AirportOrigin").Preload("AirportDestination.Location").Preload("AirportOrigin.Location").Preload("Airline").Preload("FlightSeats").Find(&flights)
	// db.Preload("Airline").Find(&flights)
	context.JSON(200, gin.H{
		"data": flights,
	})
}

func ViewAllTransit (context *gin.Context){
	var transits models.Transit

	db := database.GetDB()

	db.Preload("Airport.Airport").Find(&transits)

	context.JSON(200, gin.H {
		"data" : transits,
	})
}

func CreateNewFlight(context *gin.Context) {
	var flight models.Flight

	context.Bind(&flight)

	db := database.GetDB()

	result := db.Create(&flight)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H {
			"data": false,
			"message": "failed creating flight",
		})
	}

	context.JSON(200, gin.H {
		"message": "success",
	})
}


func CreateTransits(context *gin.Context){
	var transit models.Transit

	db := database.GetDB()

	context.Bind(&transit)

	result := db.Create(&transit)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H {
			"message": "Failed creating transit",
		})
	}

	context.JSON(200, gin.H {
		"data" : transit,
	})
}

func GetFlightDetail (context *gin.Context){
	var flight models.Flight
	flight_id := context.Param("id")
	db := database.GetDB()

	db.Preload("Airline").Preload("AirportOrigin").Preload("AirportOrigin.Location").Preload("AirportDestination").Preload("AirportDestination.Location").Preload("Transits").Preload("Transits.AirportTransit").Preload("Transits.AirportTransit.Location").Preload("FlightSeats").Find(&flight, "flight_id = ?", flight_id)

	context.JSON(200, gin.H {
		"data": flight,
	})
}
