package flights

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nosurprisesplz/tpa-web-backend/database"
	"github.com/nosurprisesplz/tpa-web-backend/models"
	"github.com/nosurprisesplz/tpa-web-backend/utils"
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

func ViewAllTransit(context *gin.Context) {
	var transits models.Transit

	db := database.GetDB()

	db.Preload("Airport.Airport").Find(&transits)

	context.JSON(200, gin.H{
		"data": transits,
	})
}

func CreateNewFlight(context *gin.Context) {
	var flight models.Flight

	context.Bind(&flight)

	err := utils.ValidateFlight(flight)

	if err != nil {
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	db := database.GetDB()

	result := db.Create(&flight)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{
			"message": result.Error.Error(),
			"success": true,
		})
		return
	}

	context.JSON(200, gin.H{
		"success": true,
	})
}

func CreateTransits(context *gin.Context) {
	var transit models.Transit

	db := database.GetDB()

	context.Bind(&transit)

	err := utils.ValidateTransit(transit)

	if err != nil {
		context.AbortWithStatusJSON(http.StatusBadRequest, utils.Response(err.Error(), false))
		return
	}

	result := db.Create(&transit)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	context.JSON(200, utils.Response("mantap", true))
}

func GetFlightDetail(context *gin.Context) {
	var flight models.Flight
	flight_id := context.Param("id")
	db := database.GetDB()

	db.Preload("Airline").Preload("AirportOrigin").Preload("AirportOrigin.Location").Preload("AirportDestination").Preload("AirportDestination.Location").Preload("Transits").Preload("Transits.AirportTransit").Preload("Transits.AirportTransit.Location").Preload("FlightSeats").Find(&flight, "flight_id = ?", flight_id)

	context.JSON(200, gin.H{
		"data": flight,
	})
}

func GetFlightRecommendation(context *gin.Context) {
	db := database.GetDB()

	var popularDestinations []struct {
		AirportCodeDestination string
		VisitCount             int
	}
	result := db.Model(&models.Flight{}).
		Select("airport_code_destination, COUNT(airport_code_destination) AS visit_count").
		Group("airport_code_destination").
		Order("visit_count DESC").
		Limit(5).
		Find(&popularDestinations)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	var airportCodes []string
	for _, dest := range popularDestinations {
		airportCodes = append(airportCodes, dest.AirportCodeDestination)
	}

	var flights []models.Flight

	result = db.Model(&models.Flight{}).
		Preload("Airline").
		Preload("AirportDestination").
		Preload("AirportDestination.Location").
		Preload("AirportOrigin.").
		Preload("AirportOrigin.Location").
		Preload("Transits").
		Preload("FlightSeats").
		Where("airport_code_destination IN ?", airportCodes).
		Find(&flights)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	context.JSON(http.StatusOK, utils.DataResponse(flights, "mantap", true))
}
