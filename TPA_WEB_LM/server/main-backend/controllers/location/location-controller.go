package location

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nosurprisesplz/tpa-web-backend/database"
	"github.com/nosurprisesplz/tpa-web-backend/models"
)

func GetAllLocation(context *gin.Context){ 
	var locations []models.Location
	db := database.GetDB()
	result := db.Find(&locations)

	if(result.Error != nil) {
		context.JSON(http.StatusInternalServerError, gin.H {
			"message": "failed fetching data",
		})
	}

	context.JSON(http.StatusOK, gin.H {
		"data" : locations,
	})
}
