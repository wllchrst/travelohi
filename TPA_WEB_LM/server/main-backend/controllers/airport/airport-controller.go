package airport

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nosurprisesplz/tpa-web-backend/database"
	"github.com/nosurprisesplz/tpa-web-backend/models"
	"github.com/nosurprisesplz/tpa-web-backend/utils"
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

	context.JSON(200, gin.H{
		"data": airlines,
	})
}

func CreateAirline(context *gin.Context) {
	var airline models.Airline
	var airlines []models.Airline
	db := database.GetDB()
	context.Bind(&airline)

	result := db.Where("airline_name = ? OR airline_code = ?", airline.AirlineName, airline.AirlineCode).Find(&airlines)

	if result.Error != nil {
		context.JSON(http.StatusBadRequest, utils.Response("Airline Name or Airline Code is being use", false))
		return
	}

	if len(airlines) > 0 {
		context.JSON(http.StatusBadRequest, utils.Response("Airline name or airline code already registered", false))
		return
	}

	err := utils.ValidateAirline(airline)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": err.Error(),
		})
		return
	}

	result = db.Create(&airline)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, gin.H{
			"message": result.Error.Error(),
			"success": false,
		})
		return
	}

	context.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "mantap",
	})
}
