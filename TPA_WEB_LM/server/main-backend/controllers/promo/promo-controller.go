package promo

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nosurprisesplz/tpa-web-backend/database"
	"github.com/nosurprisesplz/tpa-web-backend/models"
	"github.com/nosurprisesplz/tpa-web-backend/utils"
)

func CreatePromo(context *gin.Context) {
	var promo models.Promo
	db := database.GetDB()

	context.Bind(&promo)

	err := utils.ValidatePromo(promo)

	if err != nil {
		context.JSON(http.StatusBadRequest, utils.Response(err.Error(), false))
		return
	}

	db.Create(promo)
	context.JSON(200, utils.Response("mantap", true))
}

func DeletePromo(context *gin.Context) {
	var promo models.Promo
	db := database.GetDB()
	promo_id := context.Param("id")

	result := db.Find(&promo, "id = ?", promo_id)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	result = db.Delete(&promo)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	context.JSON(200, utils.Response("mantap", true))
}

func GetAllPromo(context *gin.Context) {
	var promos []models.Promo
	db := database.GetDB()
	db.Find(&promos)
	context.JSON(200, gin.H{
		"data": promos,
	})
}

func UpdatePromo(context *gin.Context) {

	var promo models.Promo
	var input models.Promo
	db := database.GetDB()

	context.Bind(&input)

	result := db.Find(&promo, "id = ?", input.ID)

	if result.Error != nil {
		context.JSON(200, utils.Response(result.Error.Error(), false))
		return
	}

	promo.DiscountValue = input.DiscountValue
	promo.PictureLink = input.PictureLink
	promo.PromoCode = input.PromoCode

	db.Save(&promo)

	if result.Error != nil {
		context.JSON(200, utils.Response(result.Error.Error(), false))
		return
	}

	context.JSON(http.StatusOK, utils.Response("mantap", true))
}
