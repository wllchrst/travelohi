package promo

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nosurprisesplz/tpa-web-backend/database"
	"github.com/nosurprisesplz/tpa-web-backend/models"
)

func CreatePromo(context *gin.Context) {
	var promo models.Promo
	db := database.GetDB()
	context.Bind(&promo)
	db.Create(promo)
	context.JSON(200, gin.H{
		"data": promo,
	})
}

func DeletePromo(context *gin.Context) {
	var promo models.Promo
	db := database.GetDB()
	promo_id := context.Param("id")

	result := db.Find(&promo, "id = ?", promo_id)

	if result.Error != nil {
		log.Fatal(result.Error)
	}


	err := db.Delete(&promo)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H {
			"message": "Failed deleting promo",
		})
		return
	}

	context.JSON(200, gin.H{
		"message": "success",
	})
}

func GetAllPromo(context *gin.Context) {
	var promos []models.Promo
	db := database.GetDB()
	db.Find(&promos)
	context.JSON(200, gin.H{
		"data": promos,
	})
}
