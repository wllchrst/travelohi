package hotel

import (
	"fmt"
	"net/http"
	"regexp"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/nosurprisesplz/tpa-web-backend/database"
	"github.com/nosurprisesplz/tpa-web-backend/models"
	"github.com/nosurprisesplz/tpa-web-backend/utils"
)

func CreateHotel(context *gin.Context) {
	var hotel models.Hotel
	var hotels []models.Hotel
	db := database.GetDB()
	context.Bind(&hotel)

	err := utils.ValidateHotel(hotel)

	result := db.Where("hotel_name LIKE ?", hotel.HotelName).Find(&hotels)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "failed creating hotel",
		})
		return
	}

	if len(hotels) > 0 {
		context.JSON(http.StatusBadRequest, utils.Response("Hotel Name is taken", false))
		return
	}

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}
	result = db.Create(&hotel)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "failed creating hotel",
		})
		return
	}
	context.JSON(http.StatusOK, gin.H{
		"success": true,
	})
}

func CreateHotelPicture(context *gin.Context) {
	var picture models.HotelPicture
	db := database.GetDB()
	context.Bind(&picture)

	err := utils.ValidateHotelPicture(picture)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}
	result := db.Create(&picture)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed creating hotel picture",
		})
	}
	context.JSON(http.StatusOK, gin.H{
		"success": true,
	})
}

func CreateHotelRoomType(context *gin.Context) {
	var roomType models.HotelRoomType
	db := database.GetDB()
	context.Bind(&roomType)

	err := utils.ValidateHotelRoomType(roomType)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	result := db.Create(&roomType)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed Creating Room Type",
		})
		return
	}

	context.JSON(200, gin.H{
		"success": true,
		"message": "mantap",
	})
}

func CreateHotelFacility(context *gin.Context) {
	var facility models.Facility
	db := database.GetDB()
	context.Bind(&facility)

	err := utils.ValidateFacility(facility)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err,
		})
		return
	}

	result := db.Create(&facility)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed create facility",
		})
	}
	context.JSON(http.StatusOK, gin.H{
		"success": true,
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

	db.Preload("Location").Preload("Ratings").Preload("Reviews").Preload("HotelPictures").Preload("HotelFacilities").Find(&hotels)

	context.JSON(200, gin.H{
		"data": hotels,
	})
}

func DeleteRoomType(context *gin.Context) {
	db := database.GetDB()
	roomTypeID := context.Param("id")

	result := db.Delete(&models.HotelRoomType{}, "room_type_id = ?", roomTypeID)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{
			"message": "failed deleting hotel room type",
		})
	}
	context.JSON(200, gin.H{
		"message": "success",
	})
}

func GetHotelRecommendation(context *gin.Context) {
	var hotels []models.Hotel
	db := database.GetDB()

	result := db.Model(&models.Hotel{}).
		Preload("Location").
		Preload("HotelPictures").
		Preload("HotelFacilities").
		Preload("Ratings").
		Select("hotels.*, COUNT(hotel_tickets.hotel_refer) AS booking_count").
		Joins("LEFT JOIN hotel_tickets ON hotels.hotel_id = hotel_tickets.hotel_refer").
		Group("hotels.hotel_id").
		Order("booking_count DESC").
		Limit(5).
		Find(&hotels)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	context.JSON(http.StatusOK, utils.DataResponse(hotels, "mantap", true))
}

func FilterHotel(context *gin.Context) {
	var filter models.HotelFilter
	var err error
	var hotels []models.Hotel
	var filteredHotels []models.Hotel
	db := database.GetDB()

	result := db.Preload("Location").Preload("Ratings").Preload("Reviews").Preload("HotelPictures").Preload("HotelFacilities").Find(&hotels)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	filterString := context.Query("Filtering")
	mediumString := context.Query("MediumRating")
	highString := context.Query("HighRating")
	minString := context.Query("PriceMinimum")
	maxString := context.Query("PriceMaximum")

	filter.PriceMinimum, err = strconv.Atoi(minString)
	fmt.Println(err)
	if err != nil {
		filter.PriceMinimum = -1
	}

	filter.PriceMaximum, err = strconv.Atoi(maxString)
	fmt.Println(err)
	if err != nil {
		filter.PriceMaximum = -1
	}

	filter.Filtering = filterString == "true"
	filter.MediumRating = mediumString == "true"
	filter.HighRating = highString == "true"

	fmt.Println(hotels)

	if !filter.Filtering {
		context.JSON(http.StatusOK, utils.DataResponse(hotels, "filtered hotels", true))
		return
	}

	for _, hotel := range hotels {
		filteredHotels = append(filteredHotels, hotel)
	}

	context.JSON(http.StatusOK, utils.DataResponse(filteredHotels, "Filtering data", true))
}

func SearchHotel(context *gin.Context) {
	query := context.Param("query")
	var hotels []models.Hotel
	var filteredHotels []models.Hotel

	db := database.GetDB()

	result := db.Preload("Location").Preload("Ratings").Preload("Reviews").Preload("HotelPictures").Preload("HotelFacilities").Find(&hotels)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	for _, hotel := range hotels {
		pattern := regexp.MustCompile(`.*` + regexp.QuoteMeta(query) + `.*`)
		if pattern.MatchString(hotel.HotelName) {
			filteredHotels = append(filteredHotels, hotel)
		}
	}

	context.JSON(http.StatusOK, utils.DataResponse(filteredHotels, "searching", true))
}
