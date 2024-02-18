package flights

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nosurprisesplz/tpa-web-backend/database"
	"github.com/nosurprisesplz/tpa-web-backend/models"
	"github.com/nosurprisesplz/tpa-web-backend/utils"
)

// API For the flightseats

// ! FOR THE ENUMERATION
// VIEW_ALL_FLIGHTSEAT = "/view_flightseat"
// VIEW_FLIGHTSEAT_BY_ID = "/view_flightseat/:id"
// UPDATE_FLIGHTSEAT = "/update_flightseat/:id"
// DELETE_FLIGHTSEAT = "/delete_flightseat"
// CREATE_FLIGHTSEAT = "/create_flightseat"

// ! FOR THE API
// engine.GET(enums.VIEW_ALL_FLIGHTSEAT, ViewFlightSeat)
// engine.GET(enums.VIEW_FLIGHTSEAT_BY_ID, ViewFlightSeatByID)
// engine.PATCH(enums.UPDATE_FLIGHTSEAT, UpdateFlightSeat)
// engine.DELETE(enums.DELETE_FLIGHTSEAT, DeleteFlightSeat)
// engine.POST(enums.CREATE_FLIGHTSEAT, CreateFlightSeat)

// ! COPY PASTE TO JAVASCRIPT
// VIEW_ALL_FLIGHTSEAT = host + "/view_flightseat",
// VIEW_FLIGHTSEAT_BY_ID = host + "/view_flightseat",
// UPDATE_FLIGHTSEAT = host + "/update_flightseat",
// DELETE_FLIGHTSEAT = host + "/delete_flightseat",
// CREATE_FLIGHTSEAT = host + "/create_flightseat"

func CreateFlightSeat(context *gin.Context) {
	var model models.FlightSeat
	db := database.GetDB()

	context.Bind(&model)
	err := utils.ValidateFlightSeat(model)

	if err != nil {
		log.Fatal(err)
		context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	result := db.Create(&model)

	fmt.Println(model)

	if result.Error != nil {
		log.Fatal(result.Error)
		context.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": result.Error.Error(),
		})
		return
	}

	context.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "mantap",
	})
}

func UpdateFlightSeat(seatID string) error {
	var model models.FlightSeat
	db := database.GetDB()
	result := db.Find(&model, "flight_seat_id = ?", seatID)

	if result.Error != nil {
		return result.Error
	}

	model.IsAvalaible = !model.IsAvalaible
	// GANTI

	db.Save(&model)

	return nil
}

func DeleteFlightSeat(context *gin.Context) {
	var model models.FlightSeat
	db := database.GetDB()
	id := context.Param("id")
	result := db.Delete(&models.FlightSeat{}, "id = ?", id)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed getting data",
		})
		return
	}

	context.JSON(http.StatusOK, gin.H{
		"data": model,
	})
}

func ViewFlightSeat(context *gin.Context) {
	var models []models.FlightSeat
	db := database.GetDB()

	result := db.Find(&models)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed getting data",
		})
		return
	}

	context.JSON(http.StatusOK, gin.H{
		"data": models,
	})
}

func ViewFlightSeatByID(context *gin.Context) {
	var model models.FlightSeat
	db := database.GetDB()
	id := context.Param("id")

	// ! Ganti yang di dalam string rating_id tergantung dengan primary key yang ada di database
	result := db.Find(&model, "rating_id = ?", id)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed getting data",
		})
		return
	}

	context.JSON(http.StatusOK, gin.H{
		"data": model,
	})
}
