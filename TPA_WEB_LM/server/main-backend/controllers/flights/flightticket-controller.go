package flights

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/nosurprisesplz/tpa-web-backend/database"
	"github.com/nosurprisesplz/tpa-web-backend/enums"
	"github.com/nosurprisesplz/tpa-web-backend/models"
	"github.com/nosurprisesplz/tpa-web-backend/utils"
)

func CreateFlightTicket(context *gin.Context) {
	var model models.FlightTicket
	db := database.GetDB()
	context.Bind(&model)

	err := utils.ValidateFlightTicket(model, true)

	if err != nil {
		context.JSON(http.StatusBadRequest, utils.Response(err.Error(), false))
		return
	}

	var seat models.FlightSeat
	var user models.User

	result := db.Find(&seat, "flight_seat_id = ?", model.FlightSeatRefer)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	totalPrice := seat.Price + model.ExtraLuggage

	userEmail := context.Param("id")

	cartID := context.Param("cart_id")

	var cart models.CartFlightTicket

	result = db.Find(&cart, "cart_id = ?", cartID)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	result = db.Find(&user, "email = ?", userEmail)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	if model.Method == enums.Wallet && totalPrice <= int(user.Wallet) {
		user.Wallet -= float32(totalPrice)
		result := db.Save(&user)

		if result.Error != nil {
			context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
			return
		}

		result = db.Delete(&cart)

		if result.Error != nil {
			context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
			return
		}

		result = db.Create(&model)

		if result.Error != nil {
			context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
			return
		}

		context.JSON(200, utils.Response("Thank you for buying with HI Wallet", true))
	} else {
		isRegistered := utils.CreditCardIsRegistered(model.UserRefer)

		if !isRegistered {
			context.JSON(http.StatusBadRequest, utils.Response("Your credit card is not registered", false))
			return
		}

		result := db.Create(&model)

		if result.Error != nil {
			context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
			return
		}

		result = db.Delete(&cart)

		if result.Error != nil {
			context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
			return
		}
		context.JSON(200, utils.Response("Thank you for buying flight ticket dont forget to pay the credit card", true))
	}

	if user.Wallet < float32(totalPrice) {
		context.JSON(200, utils.Response("You dont have enough money on HI Wallet", false))
		return
	}
}

func BuyFlight(context *gin.Context) {
	// models
	var ticket models.FlightTicket
	var user models.User
	var seat models.FlightSeat
	db := database.GetDB()
	// validate flight
	context.Bind(&ticket)

	err := utils.ValidateFlightTicket(ticket, false)

	if err != nil {
		context.JSON(http.StatusBadRequest, utils.Response(err.Error(), false))
		return
	}

	// ambil user
	result := db.Find(&user, "id = ?", ticket.UserRefer)
	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	result = db.Find(&seat, "flight_seat_id = ?", ticket.FlightSeatRefer)
	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	total := seat.Price + ticket.ExtraLuggage

	// kurangin duit
	if ticket.Method == enums.Credit {
		result = db.Create(&ticket)
		if result.Error != nil {
			context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
			return
		}

		seat.IsAvalaible = false
		result = db.Save(&seat)
		if result.Error != nil {
			context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
			return
		}

		context.JSON(200, utils.Response("mantap", true))
		return
	} else if ticket.Method == enums.Wallet && user.Wallet >= float32(total) {
		user.Wallet -= float32(total)

		result = db.Save(&user)
		if result.Error != nil {
			context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
			return
		}

		seat.IsAvalaible = false
		result = db.Save(&seat)
		if result.Error != nil {
			context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
			return
		}

		result = db.Create(&ticket)
		if result.Error != nil {
			context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
			return
		}

		context.JSON(200, utils.Response("200", true))
		return
	}

	if user.Wallet < float32(total) {
		context.JSON(http.StatusOK, utils.Response("You dont have enought HI Wallet", false))
		return
	}
}

func UpdateFlightTicket(context *gin.Context) {
	var model models.FlightTicket
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

func DeleteFlightTicket(context *gin.Context) {
	db := database.GetDB()
	id := context.Param("id")
	result := db.Delete(&models.FlightTicket{}, "flight_ticket_id = ?", id)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	context.JSON(http.StatusOK, utils.Response("mantap", true))
}

func ViewFlightTicket(context *gin.Context) {
	var models []models.FlightTicket
	db := database.GetDB()

	currentTime := time.Now()

	userId := context.Param("userId")
	result := db.Preload("Flight").Preload("Flight.FlightSeats").Preload("Flight.Airline").Preload("Flight.Transits").Preload("Flight.AirportOrigin").Preload("Flight.AirportDestination").Preload("FlightSeat").Joins("JOIN flights ON flights.flight_id = flight_tickets.flight_refer").Where("user_refer = ? AND flights.departure_time > ?", userId, currentTime).Find(&models)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	context.JSON(http.StatusOK, utils.DataResponse(models, "mantap", true))
}

func HistoryViewFlightTicket(context *gin.Context) {
	var models []models.FlightTicket
	db := database.GetDB()

	currentTime := time.Now()

	userId := context.Param("userId")
	result := db.Preload("Flight").Preload("Flight.FlightSeats").Preload("Flight.Airline").Preload("Flight.Transits").Preload("Flight.AirportOrigin").Preload("Flight.AirportDestination").Preload("FlightSeat").Joins("JOIN flights ON flights.flight_id = flight_tickets.flight_refer").Where("user_refer = ? AND flights.departure_time < ?", userId, currentTime).Find(&models)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	context.JSON(http.StatusOK, utils.DataResponse(models, "mantap", true))
}

func SearchFlightTicket(context *gin.Context) {
	var search models.FetchSearch
	var flights []models.FlightTicket
	db := database.GetDB()

	currentTime := time.Now()

	context.Bind(&search)

	fmt.Println(search)

	if search.Past {
		result := db.
			Preload("Flight").
			Preload("Flight.FlightSeats").
			Preload("Flight.Airline").
			Preload("Flight.Transits").
			Preload("Flight.AirportOrigin").
			Preload("Flight.AirportDestination").
			Preload("FlightSeat").
			Joins("JOIN flights ON flights.flight_id = flight_tickets.flight_refer").
			Joins("JOIN airlines ON airlines.airline_code = flights.airline_refer").
			Where("user_refer = ? AND flights.departure_time < ?", search.UserID, currentTime).
			Where("airlines.airline_name LIKE ?", "%"+search.Query+"%").Or("flight_refer LIKE ?", "%"+search.Query+"%").
			Find(&flights)

		if result.Error != nil {
			context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
			return
		}
		context.JSON(http.StatusOK, utils.DataResponse(flights, "", true))
	} else {
		// result := db.
		// 	Preload("Flight").
		// 	Preload("Flight.FlightSeats").
		// 	Preload("Flight.Airline").
		// 	Preload("Flight.Transits").
		// 	Preload("Flight.AirportOrigin").
		// 	Preload("Flight.AirportDestination").
		// 	Preload("FlightSeat").
		// 	Joins("JOIN flights ON flights.flight_id = flight_tickets.flight_refer").
		// 	Joins("JOIN airlines ON airlines.airline_code = flights.airline_refer").
		// 	Where("user_refer = ? AND flights.departure_time > ?", search.UserID, currentTime).
		// 	Where("airlines.airline_name LIKE ?", "%"+search.Query+"%").Or("flight_refer LIKE ?", "%"+search.Query+"%").
		// 	Find(&flights)

		result := db.
			Preload("Flight").
			Preload("Flight.FlightSeats").
			Preload("Flight.Airline").
			Preload("Flight.Transits").
			Preload("Flight.AirportOrigin").
			Preload("Flight.AirportDestination").
			Preload("FlightSeat").
			Joins("JOIN flights ON flights.flight_id = flight_tickets.flight_refer").
			Joins("JOIN airlines ON airlines.airline_code = flights.airline_refer").
			Where("user_refer = ?", search.UserID).
			Where("flights.departure_time <= ?", currentTime). // Modified condition to include past flights
			Where("airlines.airline_name LIKE ?", "%"+search.Query+"%").Or("flight_refer LIKE ?", "%"+search.Query+"%").
			Find(&flights)

		if result.Error != nil {
			context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
			return
		}
		context.JSON(http.StatusOK, utils.DataResponse(flights, "", true))
	}
}
