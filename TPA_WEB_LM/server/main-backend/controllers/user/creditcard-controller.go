package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nosurprisesplz/tpa-web-backend/database"
	"github.com/nosurprisesplz/tpa-web-backend/models"
	"github.com/nosurprisesplz/tpa-web-backend/utils"
)

// API For the creditcards

// ! FOR THE ENUMERATION
// VIEW_ALL_CREDITCARD = "/view_creditcard"
// VIEW_CREDITCARD_BY_ID = "/view_creditcard/:id"
// UPDATE_CREDITCARD = "/update_creditcard/:id"
// DELETE_CREDITCARD = "/delete_creditcard"
// CREATE_CREDITCARD = "/create_creditcard"

// ! FOR THE API
// engine.GET(enums.VIEW_ALL_CREDITCARD, ViewCreditCard)
// engine.GET(enums.VIEW_CREDITCARD_BY_ID, ViewCreditCardByID)
// engine.PATCH(enums.UPDATE_CREDITCARD, UpdateCreditCard)
// engine.DELETE(enums.DELETE_CREDITCARD, DeleteCreditCard)
// engine.POST(enums.CREATE_CREDITCARD, CreateCreditCard)

// ! COPY PASTE TO JAVASCRIPT
// VIEW_ALL_CREDITCARD = host + "/view_creditcard",
// VIEW_CREDITCARD_BY_ID = host + "/view_creditcard",
// UPDATE_CREDITCARD = host + "/update_creditcard",
// DELETE_CREDITCARD = host + "/delete_creditcard",
// CREATE_CREDITCARD = host + "/create_creditcard"

func CreateCreditCard(context *gin.Context) {
	var model models.CreditCard
	db := database.GetDB()

	context.Bind(&model)

	err := utils.ValidateCreditCard(model)

	if err != nil {
		context.JSON(http.StatusBadRequest, utils.Response(err.Error(), false))
		return
	}

	result := db.Create(&model)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	context.JSON(http.StatusOK, utils.Response("ok", true))
}

func UpdateCreditCard(context *gin.Context) {
	var model models.CreditCard
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

func DeleteCreditCard(context *gin.Context) {
	var model models.CreditCard
	db := database.GetDB()
	id := context.Param("id")
	result := db.Delete(&models.CreditCard{}, "id = ?", id)

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

func ViewCreditCard(context *gin.Context) {
	var models []models.CreditCard
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

func ViewCreditCardByID(context *gin.Context) {
	var model models.CreditCard
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
