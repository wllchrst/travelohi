package airport

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nosurprisesplz/tpa-web-backend/database"
	"github.com/nosurprisesplz/tpa-web-backend/models"
)

func GetAllAirport(context *gin.Context) {
	var airports []models.Airport
	db := database.GetDB()
	result := db.Preload("Location").Find(&airports)

	if result.Error != nil {
		fmt.Println("failed getting data")
	}

	context.JSON(http.StatusOK, gin.H{
		"data": airports,
	})
}

func GetAllAirline(context *gin.Context) {
	var airlines []models.Airline
	db := database.GetDB()
	db.Find(&airlines)

	context.JSON(200, gin.H {
		"data": airlines,
	})
}

func CreateAirline (context *gin.Context){
	var airline models.Airline
	db := database.GetDB()
	context.Bind(&airline)
	fmt.Println(airline)
	result := db.Create(&airline)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H {
			"message": "failed creating airline",
		})
	}

	context.JSON(http.StatusOK, gin.H {
		"data": true,
	})
}
