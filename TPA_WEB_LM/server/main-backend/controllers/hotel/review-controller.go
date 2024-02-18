package hotel

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nosurprisesplz/tpa-web-backend/database"
	"github.com/nosurprisesplz/tpa-web-backend/models"
	"github.com/nosurprisesplz/tpa-web-backend/utils"
)

// API For the reviews

// ! FOR THE ENUMERATION
// VIEW_ALL_REVIEW = "/view_review"
// VIEW_REVIEW_BY_ID = "/view_review/:id"
// UPDATE_REVIEW = "/update_review/:id"
// DELETE_REVIEW = "/delete_review"
// CREATE_REVIEW = "/create_review"

// ! FOR THE API
// engine.GET(enums.VIEW_ALL_REVIEW, ViewReview)
// engine.GET(enums.VIEW_REVIEW_BY_ID, ViewReviewByID)
// engine.PATCH(enums.UPDATE_REVIEW, UpdateReview)
// engine.DELETE(enums.DELETE_REVIEW, DeleteReview)
// engine.POST(enums.CREATE_REVIEW, CreateReview)

// ! COPY PASTE TO JAVASCRIPT
// VIEW_ALL_REVIEW = host + "/view_review",
// VIEW_REVIEW_BY_ID = host + "/view_review",
// UPDATE_REVIEW = host + "/update_review",
// DELETE_REVIEW = host + "/delete_review",
// CREATE_REVIEW = host + "/create_review",

func CreateReview(context *gin.Context) {
	var model models.Review
	db := database.GetDB()

	context.Bind(&model)

	err := utils.ValidateReview(model)

	if err != nil {
		context.JSON(http.StatusBadRequest, utils.Response(err.Error(), false))
		return
	}

	result := db.Create(&model)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	context.JSON(http.StatusOK, utils.Response("mantap", true))
}

func UpdateReview(context *gin.Context) {
	var model models.Review
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

func DeleteReview(context *gin.Context) {
	var model models.Review
	db := database.GetDB()
	id := context.Param("id")
	result := db.Delete(&models.Review{}, "id = ?", id)

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

func ViewReview(context *gin.Context) {
	var models []models.Review
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

func ViewReviewByID(context *gin.Context) {
	var model models.Review
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
