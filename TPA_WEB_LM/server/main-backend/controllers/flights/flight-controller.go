package flights

import (
	"fmt"
	"net/http"
	"regexp"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/nosurprisesplz/tpa-web-backend/database"
	"github.com/nosurprisesplz/tpa-web-backend/models"
	"github.com/nosurprisesplz/tpa-web-backend/utils"
)

func ViewAllFlight(context *gin.Context) {
	var flights []models.Flight

	db := database.GetDB()

	// db.Preload("Airline").Preload("AirportDestination").Preload("AirportDestination.Location").Preload("AirportOrigin").Preload("AiportOrigin.Location").Find(&flights)

	currentDate := time.Now()

	db.Preload("Transits").Preload("Transits.AirportTransit").Preload("Transits.AirportTransit.Location").Preload("AirportDestination").Preload("AirportOrigin").Preload("AirportDestination.Location").Preload("AirportOrigin.Location").Preload("Airline").Preload("FlightSeats").Where("departure_time > ?", currentDate).Find(&flights)

	// db.Preload("Airline").Find(&flights)
	context.JSON(200, utils.DataResponse(flights, "mantap", true))
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

func FilterFlights(context *gin.Context) {
	var filter models.FlightFilter
	var flights []models.Flight
	var filteredFlights []models.Flight
	var err error

	db := database.GetDB()

	currentDate := time.Now()

	result := db.Preload("Transits").Preload("Transits.AirportTransit").Preload("Transits.AirportTransit.Location").Preload("AirportDestination").Preload("AirportOrigin").Preload("AirportDestination.Location").Preload("AirportOrigin.Location").Preload("Airline").Preload("FlightSeats").Where("departure_time > ?", currentDate).Find(&flights)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response("Failed filtering flight", false))
		return
	}

	durationString := context.Query("Duration")
	notString := context.Query("NumberOfTransit")
	PriceMinimum := context.Query("PriceMinimum")
	PriceMaximum := context.Query("PriceMaximum")

	filter.Duration, err = strconv.Atoi(durationString)
	fmt.Println(err)

	if err != nil {
		filter.Duration = -1
	}

	filter.IsTransit = context.Query("IsTransit") == "true"

	filter.NumberOfTransit, err = strconv.Atoi(notString)
	fmt.Println(err)

	if err != nil {
		filter.NumberOfTransit = -1
	}

	filter.PriceMinimum, err = strconv.Atoi(PriceMinimum)
	fmt.Println(err)
	if err != nil {
		filter.PriceMinimum = -1
	}

	filter.PriceMaximum, err = strconv.Atoi(PriceMaximum)
	fmt.Println(err)
	if err != nil {
		filter.PriceMaximum = -1
	}

	// ! FILTERING

	fmt.Println(filter)

	for _, flight := range flights {
		if flight.ArrivalTime >= filter.Duration && filter.Duration != -1 {
			// fmt.Println("tiem : ", flight.ArrivalTime)
			// fmt.Println("Duration : ", filter.Duration)
			fmt.Println("Duration nya lebih lama dari filter")
			continue
		} else if len(flight.Transits) >= filter.NumberOfTransit && filter.NumberOfTransit != -1 {
			fmt.Println("Transit nya kabanyakan")
			continue
		} else if len(flight.Transits) > 0 && !filter.IsTransit {
			fmt.Println("ada transit tapi filter g ada")
			continue
		} else if len(flight.Transits) <= 0 && filter.IsTransit {
			fmt.Println("g ada transit tapi filter ada")
			continue
		}

		maximum := false
		minimum := false

		for _, seat := range flight.FlightSeats {
			if seat.Price >= filter.PriceMinimum && filter.PriceMinimum != -1 {
				minimum = true
				break
			} else if seat.Price <= filter.PriceMaximum && filter.PriceMaximum != -1 {
				maximum = true
				break
			}
		}

		if filter.PriceMaximum == -1 {
			maximum = true
		}

		if filter.PriceMinimum == -1 {
			minimum = true
		}

		if !minimum || !maximum {
			fmt.Println("SEat is not valid")
			continue
		}

		filteredFlights = append(filteredFlights, flight)
	}

	fmt.Println("Filter FLight len ", len(filteredFlights))

	context.JSON(200, utils.DataResponse(filteredFlights, "filtering flights", true))
}

func SearchFlight(context *gin.Context) {
	var flights []models.Flight
	var filteredFlights []models.Flight
	query := context.Param("query")
	db := database.GetDB()
	currentDate := time.Now()

	result := db.Preload("Transits").Preload("Transits.AirportTransit").Preload("Transits.AirportTransit.Location").Preload("AirportDestination").Preload("AirportOrigin").Preload("AirportDestination.Location").Preload("AirportOrigin.Location").Preload("Airline").Preload("FlightSeats").Where("departure_time > ?", currentDate).Find(&flights)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	for _, flight := range flights {
		pattern := regexp.MustCompile(`.*` + regexp.QuoteMeta(query) + `.*`)
		if pattern.MatchString(flight.AirportDestination.AirportName) {
			filteredFlights = append(filteredFlights, flight)
		}
	}

	context.JSON(200, utils.DataResponse(filteredFlights, "mantap", true))
}
