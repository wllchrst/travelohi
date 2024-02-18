package hotel

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

// API For the hoteltickets

// ! FOR THE ENUMERATION
// VIEW_ALL_HOTELTICKET = "/view_hotelticket"
// VIEW_HOTELTICKET_BY_ID = "/view_hotelticket/:id"
// UPDATE_HOTELTICKET = "/update_hotelticket/:id"
// DELETE_HOTELTICKET = "/delete_hotelticket"
// CREATE_HOTELTICKET = "/create_hotelticket"

// ! FOR THE API
// engine.GET(enums.VIEW_ALL_HOTELTICKET, ViewHotelTicket)
// engine.GET(enums.VIEW_HOTELTICKET_BY_ID, ViewHotelTicketByID)
// engine.PATCH(enums.UPDATE_HOTELTICKET, UpdateHotelTicket)
// engine.DELETE(enums.DELETE_HOTELTICKET, DeleteHotelTicket)
// engine.POST(enums.CREATE_HOTELTICKET, CreateHotelTicket)

// ! COPY PASTE TO JAVASCRIPT
// VIEW_ALL_HOTELTICKET = host + "/view_hotelticket",
// VIEW_HOTELTICKET_BY_ID = host + "/view_hotelticket",
// UPDATE_HOTELTICKET = host + "/update_hotelticket",
// DELETE_HOTELTICKET = host + "/delete_hotelticket",
// CREATE_HOTELTICKET = host + "/create_hotelticket"

func CreateHotelTicket(context *gin.Context) {
	var model models.HotelTicket
	var user models.User
	var cart models.CartHotelTicket
	var room models.HotelRoomType

	db := database.GetDB()

	cartID := context.Param("id")

	context.Bind(&model)

	err := utils.ValidateHotelTicket(model)

	if err != nil {
		context.JSON(http.StatusBadRequest, utils.Response(err.Error(), false))
		return
	}

	result := db.Find(&user, "id = ?", model.UserRefer)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	result = db.Find(&room, "room_type_id = ?", model.RoomTypeRefer)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	result = db.Find(&cart, "cart_id = ?", cartID)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	days := utils.DaysBetween(cart.CheckInDate, cart.CheckOutDate)
	totalPrice := room.Price * days

	if model.Method == enums.Credit {
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

		context.JSON(http.StatusOK, utils.Response("mantap", true))
		return

	} else if model.Method == enums.Wallet && user.Wallet >= float32(totalPrice) {
		user.Wallet -= float32(totalPrice)
		result = db.Save(&user)

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

		context.JSON(200, utils.Response("mantap", true))
	}

	if user.Wallet < float32(totalPrice) {
		context.JSON(200, utils.Response("You dont have enough money on HI Wallet", false))
		return
	}
}

func BuyHotel(context *gin.Context) {
	var ticket models.HotelTicket
	var user models.User
	var room models.HotelRoomType
	db := database.GetDB()

	context.Bind(&ticket)

	err := utils.ValidateHotelTicket(ticket)

	if err != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(err.Error(), false))
		return
	}

	result := db.Find(&user, "id = ?", ticket.UserRefer)
	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	result = db.Find(&room, "room_type_id = ?", ticket.RoomTypeRefer)
	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	days := utils.DaysBetween(ticket.CheckInDate, ticket.CheckOutDate)
	totalPrice := room.Price * days

	if ticket.Method == enums.Credit {
		result = db.Create(&ticket)
		if result.Error != nil {
			context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
			return
		}

		context.JSON(200, utils.Response("mantap", true))
		return
	} else if ticket.Method == enums.Wallet && user.Wallet >= float32(totalPrice) {
		user.Wallet -= float32(totalPrice)
		result = db.Save(&user)

		if result.Error != nil {
			context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
			return
		}

		result = db.Create(&ticket)

		if result.Error != nil {
			context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
			return
		}

		context.JSON(200, utils.Response(("mantap"), true))
		return
	}

	if user.Wallet < float32(totalPrice) {
		context.JSON(200, utils.Response("Not enought money", false))
		return
	}

}

func UpdateHotelTicket(context *gin.Context) {
	var model models.HotelTicket
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

func DeleteHotelTicket(context *gin.Context) {
	var model models.HotelTicket
	db := database.GetDB()
	id := context.Param("id")
	result := db.Delete(&models.HotelTicket{}, "id = ?", id)

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

func ViewHotelTicket(context *gin.Context) {
	var models []models.HotelTicket
	db := database.GetDB()

	userId := context.Param("userId")
	currentTime := time.Now()

	result := db.Preload("RoomType").Preload("Hotel").Preload("Hotel.HotelPictures").Preload("Hotel.Location").Where("user_refer = ? AND check_in_date > ?", userId, currentTime).Find(&models)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	context.JSON(http.StatusOK, utils.DataResponse(models, "mantap", true))
}

func HistoryViewHotelTicket(context *gin.Context) {
	var models []models.HotelTicket
	db := database.GetDB()

	userId := context.Param("userId")
	currentTime := time.Now()

	result := db.Preload("RoomType").Preload("Hotel").Preload("Hotel.HotelPictures").Preload("Hotel.Location").Where("user_refer = ? AND check_in_date < ?", userId, currentTime).Find(&models)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	context.JSON(http.StatusOK, utils.DataResponse(models, "mantap", true))
}

func SearchHotelTicket(context *gin.Context) {
	var search models.FetchSearch
	var tickets []models.HotelTicket
	db := database.GetDB()

	fmt.Println(context.Request.Body)

	context.Bind(&search)

	currentTime := time.Now()

	fmt.Println(search)

	if search.Past {
		result := db.Preload("RoomType").Preload("Hotel").Preload("Hotel.HotelPictures").Preload("Hotel.Location").Joins("JOIN hotels ON hotels.hotel_id = hotel_tickets.hotel_refer").Where("user_refer = ? AND check_in_date < ? AND hotels.hotel_name LIKE ?", search.UserID, currentTime, "%"+search.Query+"%").Find(&tickets)
		if result.Error != nil {
			context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
			return
		}
	} else {
		result := db.Preload("RoomType").Preload("Hotel").Preload("Hotel.HotelPictures").Preload("Hotel.Location").Joins("JOIN hotels ON hotels.hotel_id = hotel_tickets.hotel_refer").Where("user_refer = ? AND check_in_date > ? AND hotels.hotel_name LIKE ?", search.UserID, currentTime, "%"+search.Query+"%").Find(&tickets)
		if result.Error != nil {
			context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
			return
		}
	}
	context.JSON(200, utils.DataResponse(tickets, "mantap", true))
}
