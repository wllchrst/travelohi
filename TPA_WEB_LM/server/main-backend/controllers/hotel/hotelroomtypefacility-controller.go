package hotel

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nosurprisesplz/tpa-web-backend/database"
	"github.com/nosurprisesplz/tpa-web-backend/models"
	"github.com/nosurprisesplz/tpa-web-backend/utils"
)

// API For the hotelroomtypefacilitys

// ! FOR THE ENUMERATION
// VIEW_ALL_HOTELROOMTYPEFACILITY = "/view_hotelroomtypefacility"
// VIEW_HOTELROOMTYPEFACILITY_BY_ID = "/view_hotelroomtypefacility/:id"
// UPDATE_HOTELROOMTYPEFACILITY = "/update_hotelroomtypefacility/:id"
// DELETE_HOTELROOMTYPEFACILITY = "/delete_hotelroomtypefacility"
// CREATE_HOTELROOMTYPEFACILITY = "/create_hotelroomtypefacility"

// ! FOR THE API
// engine.GET(enums.VIEW_ALL_HOTELROOMTYPEFACILITY, ViewHotelRoomTypeFacility)
// engine.GET(enums.VIEW_HOTELROOMTYPEFACILITY_BY_ID, ViewHotelRoomTypeFacilityByID)
// engine.PATCH(enums.UPDATE_HOTELROOMTYPEFACILITY, UpdateHotelRoomTypeFacility)
// engine.DELETE(enums.DELETE_HOTELROOMTYPEFACILITY, DeleteHotelRoomTypeFacility)
// engine.POST(enums.CREATE_HOTELROOMTYPEFACILITY, CreateHotelRoomTypeFacility)

// ! COPY PASTE TO JAVASCRIPT
// VIEW_ALL_HOTELROOMTYPEFACILITY = host + "/view_hotelroomtypefacility",
// VIEW_HOTELROOMTYPEFACILITY_BY_ID = host + "/view_hotelroomtypefacility",
// UPDATE_HOTELROOMTYPEFACILITY = host + "/update_hotelroomtypefacility",
// DELETE_HOTELROOMTYPEFACILITY = host + "/delete_hotelroomtypefacility",
// CREATE_HOTELROOMTYPEFACILITY = host + "/create_hotelroomtypefacility"

func CreateHotelRoomTypeFacility(context *gin.Context) {
	var model models.HotelRoomTypeFacility
	db := database.GetDB()

	context.Bind(&model)

	err := utils.ValidateHotelRoomTypeFacility(model)

	if err != nil {
		context.JSON(http.StatusBadRequest, utils.Response(err.Error(), false))
		return
	}

	result := db.Create(&model)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	context.JSON(200, utils.Response("mantap", true))
}

func UpdateHotelRoomTypeFacility(context *gin.Context) {
	var model models.HotelRoomTypeFacility
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

func DeleteHotelRoomTypeFacility(context *gin.Context) {
	var model models.HotelRoomTypeFacility
	db := database.GetDB()
	id := context.Param("id")
	fmt.Println(id)
	result := db.Delete(&models.HotelRoomTypeFacility{}, "room_type_facility_id = ?", id)

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

func ViewHotelRoomTypeFacility(context *gin.Context) {
	var models []models.HotelRoomTypeFacility
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

func ViewHotelRoomTypeFacilityByID(context *gin.Context) {
	var model models.HotelRoomTypeFacility
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
