package hotel

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nosurprisesplz/tpa-web-backend/database"
	"github.com/nosurprisesplz/tpa-web-backend/models"
)

func CreateHotel(context *gin.Context) {
	var hotel models.Hotel
	db := database.GetDB()
	context.Bind(&hotel)
	fmt.Println(hotel)

	result := db.Create(&hotel)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{
			"message": "failed creating hotel",
		})
	}
	context.JSON(http.StatusOK, gin.H{
		"data": true,
	})
}

func CreateHotelPicture(context *gin.Context) {
	var picture models.HotelPicture
	db := database.GetDB()
	context.Bind(&picture)
	fmt.Println(picture)
	result := db.Create(&picture)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed creating hotel picture",
		})
	}
	context.JSON(http.StatusOK, gin.H{
		"data": true,
	})
}

func CreateHotelRoomType (context *gin.Context) {
	var roomType models.HotelRoomType
	db := database.GetDB()
	context.Bind(&roomType)

	result := db.Create(&roomType)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed Creating Room Type",
		})
	}

	context.JSON(200, gin.H {
		"message": "success",
	})
}

func CreateHotelFacility(context *gin.Context) {
	var facility models.Facility
	db := database.GetDB()
	context.Bind(&facility)
	fmt.Println(facility)
	result := db.Create(&facility)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed create facility",
		})
	}
	context.JSON(http.StatusOK, gin.H{
		"data": true,
	})
}

func GetHotelDetail(context *gin.Context) {
	var hotel models.Hotel
	hotelID := context.Param("id")

	fmt.Println(hotelID)
	
	db := database.GetDB()

	db.Preload("Location").Preload("HotelPictures").Preload("HotelFacilities").Preload("HotelRoomType").Preload("HotelRoomType.HotelRoomTypeFacilities").Preload("HotelRoomType.HotelRoomTypeFacilities.Facility").First(&hotel, "hotel_id = ?", hotelID)

	context.JSON(200, gin.H{
		"data": hotel,
	})
}

func ViewAllHotel(context *gin.Context) {
	var hotels []models.Hotel

	db := database.GetDB()

	db.Preload("Location").Preload("HotelPictures").Preload("HotelFacilities").Find(&hotels)

	context.JSON(200, gin.H{
		"data": hotels,
	})
}


func DeleteRoomType (context *gin.Context){
	db := database.GetDB()
	roomTypeID := context.Param("id")


	result := db.Delete(&models.HotelRoomType{}, "room_type_id = ?", roomTypeID)


	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H {
			"message" : "failed deleting hotel room type",
		})
	}
	context.JSON(200, gin.H {
		"message" : "success",
	})
}
