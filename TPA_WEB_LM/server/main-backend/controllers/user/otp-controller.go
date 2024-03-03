package user

import (
	"crypto/rand"
	"fmt"
	"math/big"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/nosurprisesplz/tpa-web-backend/database"
	"github.com/nosurprisesplz/tpa-web-backend/models"
	"github.com/nosurprisesplz/tpa-web-backend/utils"
)

var otps []models.Otp

func GenerateOTP(length int) (string, error) {
	charSet := "0123456789"
	charsetLength := big.NewInt(int64(len(charSet)))
	otp := make([]byte, length)
	for i := range otp {
		randomIndex, err := rand.Int(rand.Reader, charsetLength)
		if err != nil {
			return "", err
		}
		otp[i] = charSet[randomIndex.Int64()]
	}

	return string(otp), nil
}

func CreateOTP(email string) models.Otp {
	var otp models.Otp

	otp.Email = email
	otp.Code, _ = GenerateOTP(6)
	otp.Made = time.Now()

	otps = append(otps, otp)
	return otp
}

func GetOTP(context *gin.Context) {
	var user models.User
	email := context.Param("email")
	db := database.GetDB()

	result := db.Find(&user, "email = ?", email)

	if result.Error != nil {
		context.JSON(200, utils.Response(result.Error.Error(), false))
		return
	}

	if user.Email == email {
		otp := CreateOTP(user.Email)
		utils.SendEmail("OTP Code", "CODE : "+otp.Code, otp.Email)
		context.JSON(200, utils.Response("mantap", true))
		return
	}
	context.JSON(200, utils.Response("User Was Not Found", false))
}

func LoginUsingOTP(context *gin.Context) {
	code := context.Param("otp")

	for _, otp := range otps {
		if otp.Code == code {
			currentTime := time.Now()

			difference := currentTime.Sub(otp.Made).Seconds()

			if difference > 60 {
				context.JSON(200, utils.Response("Your code has expired", false))
				return
			}

			db := database.GetDB()
			var user models.User

			result := db.First(&user, "email = ?", otp.Email)

			if result.Error != nil {
				fmt.Println(result.Error)
				context.JSON(http.StatusUnauthorized, gin.H{
					"message": "invalid credential",
				})

				return
			}

			if user.Banned {
				context.JSON(404, utils.Response("account is banned", false))
				return
			}

			if user.IsLoggedIn {
				context.JSON(404, utils.Response("you are logged in", false))
				return
			}

			tokenString, err := CreateToken(user.Email)

			if err != nil {
				context.JSON(http.StatusInternalServerError, gin.H{
					"message": "error creating token",
				})
				return
			}

			user.IsLoggedIn = true

			db.Save(&user)

			context.JSON(http.StatusOK, utils.DataResponse(tokenString, "LOGIN SUCCESS USING OTP", true))
			return
		}
	}

	context.JSON(200, utils.Response("Your code was not found", false))
}
