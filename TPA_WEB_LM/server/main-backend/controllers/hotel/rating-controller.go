package hotel

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nosurprisesplz/tpa-web-backend/database"
	"github.com/nosurprisesplz/tpa-web-backend/models"
)

// API For the ratings

// ! FOR THE ENUMERATION
// VIEW_ALL_RATING = "/view_rating"
// VIEW_RATING_BY_ID = "/view_rating/:id"
// UPDATE_RATING = "/update_rating/:id"
// DELETE_RATING = "/delete_rating"
// CREATE_RATING = "/create_rating"

// ! FOR THE API
// engine.GET(enums.VIEW_ALL_RATING)
// engine.GET(enums.VIEW_RATING_BY_ID)
// engine.PATCH(enums.UPDATE_RATING)
// engine.DELETE(enums.DELETE_RATING)
// engine.POST(enums.CREATE_RATING)

// ! COPY PASTE TO JAVASCRIPT
// VIEW_ALL_RATING = host + "/view_rating",
// VIEW_RATING_BY_ID = host + "/view_rating",
// UPDATE_RATING = host + "/update_rating",
// DELETE_RATING = host + "/delete_rating",
// CREATE_RATING = host + "/create_rating"

func CreateRating(context *gin.Context) {
	var model models.Rating
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

func UpdateRating(context *gin.Context) {
	var model models.Rating
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

func DeleteRating(context *gin.Context) {
	var model models.Rating
	db := database.GetDB()
	id := context.Param("id")
	result := db.Delete(&models.Rating{}, "id = ?", id)

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

func ViewRating(context *gin.Context) {
	var models []models.Rating
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

func ViewRatingByID(context *gin.Context) {
	var model models.Rating
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
