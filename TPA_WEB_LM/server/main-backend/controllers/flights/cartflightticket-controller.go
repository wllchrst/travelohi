package flights

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nosurprisesplz/tpa-web-backend/database"
	"github.com/nosurprisesplz/tpa-web-backend/models"
	"github.com/nosurprisesplz/tpa-web-backend/utils"
)

// API For the cartflighttickets

// ! FOR THE ENUMERATION
// VIEW_ALL_CARTFLIGHTTICKET = "/view_cartflightticket"
// VIEW_CARTFLIGHTTICKET_BY_ID = "/view_cartflightticket/:id"
// UPDATE_CARTFLIGHTTICKET = "/update_cartflightticket/:id"
// DELETE_CARTFLIGHTTICKET = "/delete_cartflightticket"
// CREATE_CARTFLIGHTTICKET = "/create_cartflightticket"

// ! FOR THE API
// engine.GET(enums.VIEW_ALL_CARTFLIGHTTICKET, ViewCartFlightTicket)
// engine.GET(enums.VIEW_CARTFLIGHTTICKET_BY_ID, ViewCartFlightTicketByID)
// engine.PATCH(enums.UPDATE_CARTFLIGHTTICKET, UpdateCartFlightTicket)
// engine.DELETE(enums.DELETE_CARTFLIGHTTICKET, DeleteCartFlightTicket)
// engine.POST(enums.CREATE_CARTFLIGHTTICKET, CreateCartFlightTicket)

// ! COPY PASTE TO JAVASCRIPT
// VIEW_ALL_CARTFLIGHTTICKET = host + "/view_cartflightticket",
// VIEW_CARTFLIGHTTICKET_BY_ID = host + "/view_cartflightticket",
// UPDATE_CARTFLIGHTTICKET = host + "/update_cartflightticket",
// DELETE_CARTFLIGHTTICKET = host + "/delete_cartflightticket",
// CREATE_CARTFLIGHTTICKET = host + "/create_cartflightticket"

func CreateCartFlightTicket(context *gin.Context) {
	var model models.CartFlightTicket
	db := database.GetDB()

	context.Bind(&model)

	err := utils.ValidateCartFlightTicket(model)

	if err != nil {
		context.JSON(http.StatusBadRequest, utils.Response(err.Error(), false))
		return
	}

	updateResult := UpdateFlightSeat(model.FlightSeatRefer)

	if updateResult != nil {
		context.JSON(http.StatusBadRequest, utils.Response(updateResult.Error(), false))
		return
	}

	result := db.Create(&model)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	context.JSON(http.StatusOK, utils.Response("mantap", true))
}

func UpdateCartFlightTicket(context *gin.Context) {
	var model models.CartFlightTicket
	db := database.GetDB()
	id := context.Param("id")
	result := db.Find(&model, "rating_id = ?", id)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed getting data",
		})
		return
	}

	// GANTI

	db.Save(&model)

	context.JSON(http.StatusOK, gin.H{
		"data": model,
	})

}

func DeleteCartFlightTicket(context *gin.Context) {
	db := database.GetDB()
	id := context.Param("id")
	result := db.Delete(&models.CartFlightTicket{}, "cart_id = ?", id)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	context.JSON(http.StatusOK, utils.Response("Deleted cart flight ticket", true))
}

func ViewCartFlightTicket(context *gin.Context) {
	var models []models.CartFlightTicket
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

func ViewCartFlightTicketByID(context *gin.Context) {
	var model []models.CartFlightTicket

	db := database.GetDB()
	id := context.Param("id")

	// ! Ganti yang di dalam string rating_id tergantung dengan primary key yang ada di database
	result := db.Preload("User").Preload("Flight").Preload("Flight.Airline").Preload("Flight.AirportDestination").Preload("Flight.AirportOrigin").Preload("Flight.Transits").Preload("Flight.FlightSeats").Preload("FlightSeat").Find(&model, "user_refer= ?", id)

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
