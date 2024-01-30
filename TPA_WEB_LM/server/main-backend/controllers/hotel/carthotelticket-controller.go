package hotel

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nosurprisesplz/tpa-web-backend/database"
	"github.com/nosurprisesplz/tpa-web-backend/models"
)

// API For the carthoteltickets

// ! FOR THE ENUMERATION
// VIEW_ALL_CARTHOTELTICKET = "/view_carthotelticket"
// VIEW_CARTHOTELTICKET_BY_ID = "/view_carthotelticket/:id"
// UPDATE_CARTHOTELTICKET = "/update_carthotelticket/:id"
// DELETE_CARTHOTELTICKET = "/delete_carthotelticket"
// CREATE_CARTHOTELTICKET = "/create_carthotelticket"

// ! FOR THE API
// engine.GET(enums.VIEW_ALL_CARTHOTELTICKET, ViewCartHotelTicket)
// engine.GET(enums.VIEW_CARTHOTELTICKET_BY_ID, ViewCartHotelTicketByID)
// engine.PATCH(enums.UPDATE_CARTHOTELTICKET, UpdateCartHotelTicket)
// engine.DELETE(enums.DELETE_CARTHOTELTICKET, DeleteCartHotelTicket)
// engine.POST(enums.CREATE_CARTHOTELTICKET, CreateCartHotelTicket)

// ! COPY PASTE TO JAVASCRIPT
// VIEW_ALL_CARTHOTELTICKET = host + "/view_carthotelticket",
// VIEW_CARTHOTELTICKET_BY_ID = host + "/view_carthotelticket",
// UPDATE_CARTHOTELTICKET = host + "/update_carthotelticket",
// DELETE_CARTHOTELTICKET = host + "/delete_carthotelticket",
// CREATE_CARTHOTELTICKET = host + "/create_carthotelticket"

func CreateCartHotelTicket(context *gin.Context) {
	var model models.CartHotelTicket
	db := database.GetDB()

	context.Bind(&model)

	result := db.Create(&model)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed creating data",
		})
		return
	}

	context.JSON(http.StatusOK, gin.H{
		"message": "success",
	})
}

func UpdateCartHotelTicket(context *gin.Context) {
	var model models.CartHotelTicket
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

func DeleteCartHotelTicket(context *gin.Context) {
	var model models.CartHotelTicket
	db := database.GetDB()
	id := context.Param("id")
	result := db.Delete(&models.CartHotelTicket{}, "id = ?", id)

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

func ViewCartHotelTicket(context *gin.Context) {
	var models []models.CartHotelTicket
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

func ViewCartHotelTicketByID(context *gin.Context) {
	var model []models.CartHotelTicket
	db := database.GetDB()
	id := context.Param("id")

	// ! Ganti yang di dalam string rating_id tergantung dengan primary key yang ada di database
	result := db.Preload("Hotel").Preload("Hotel.Location").Preload("Hotel.HotelPictures").Preload("Hotel.HotelFacilities").Preload("RoomType").Preload("RoomType.HotelRoomTypeFacilities").Preload("RoomType.HotelRoomTypeFacilities.Facility").Preload("User").Find(&model, "user_refer = ?", id)

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
