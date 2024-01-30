package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nosurprisesplz/tpa-web-backend/database"
	"github.com/nosurprisesplz/tpa-web-backend/models"
)

// API For the objects

// ! FOR THE ENUMERATION
// VIEW_ALL_OBJECT = "/view_object"
// VIEW_OBJECT_BY_ID = "/view_object/:id"
// UPDATE_OBJECT = "/update_object/:id"
// DELETE_OBJECT = "/delete_object"
// CREATE_OBJECT = "/create_object"

// ! FOR THE API
// engine.GET(enums.VIEW_ALL_OBJECT, ViewObject)
// engine.GET(enums.VIEW_OBJECT_BY_ID, ViewObjectByID)
// engine.PATCH(enums.UPDATE_OBJECT, UpdateObject)
// engine.DELETE(enums.DELETE_OBJECT, DeleteObject)
// engine.POST(enums.CREATE_OBJECT, CreateObject)

// ! COPY PASTE TO JAVASCRIPT
// VIEW_ALL_OBJECT = host + "/view_object",
// VIEW_OBJECT_BY_ID = host + "/view_object",
// UPDATE_OBJECT = host + "/update_object",
// DELETE_OBJECT = host + "/delete_object",
// CREATE_OBJECT = host + "/create_object"

func CreateObject(context *gin.Context) {
	var model models.Object
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

func UpdateObject(context *gin.Context) {
	var model models.Object
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

func DeleteObject(context *gin.Context) {
	var model models.Object
	db := database.GetDB()
	id := context.Param("id")
	result := db.Delete(&models.Object{}, "id = ?", id)

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

func ViewObject(context *gin.Context) {
	var models []models.Object
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

func ViewObjectByID(context *gin.Context) {
	var model models.Object
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
