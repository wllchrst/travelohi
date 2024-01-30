package user

import (
	"errors"
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"github.com/nosurprisesplz/tpa-web-backend/database"
	"github.com/nosurprisesplz/tpa-web-backend/models"
	"gorm.io/gorm"
)

func Auth(context *gin.Context) {
	tokenString := context.Param("token")
	claims := &CustomClaims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return os.Getenv("SIGNING_KEY"), nil
	})

	if err != nil {
		fmt.Println(err)
	}

	if !token.Valid {
		fmt.Println(token)
	}

	var user models.User

	db := database.GetDB()

	result := db.First(&user, "email = ?", claims.Email)

	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		context.JSON(401, gin.H{
			"message": "invalid credentials",
		})
	}

	if result.Error != nil {
		context.JSON(http.StatusUnauthorized, gin.H{
			"message": "failed getting information",
		})
	}

	context.JSON(200, gin.H{
		"data": user,
	})
}
