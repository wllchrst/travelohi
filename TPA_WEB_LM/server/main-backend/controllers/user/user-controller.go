package user

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/nosurprisesplz/tpa-web-backend/database"
	"github.com/nosurprisesplz/tpa-web-backend/models"
	"github.com/nosurprisesplz/tpa-web-backend/utils"
	"golang.org/x/crypto/bcrypt"
)

func LoginUser(context *gin.Context) {
	db := database.GetDB()
	var loginData models.LoginUser
	var user models.User

	context.Bind(&loginData)

	fmt.Println(loginData)

	result := db.First(&user, "email = ?", loginData.Email)

	if result.Error != nil {
		fmt.Println(result.Error)
		context.JSON(http.StatusUnauthorized, gin.H{
			"message": "invalid credential",
		})

		return
	}

	isMatch := utils.ValidatePassword(loginData.Password, user.Password)

	if !isMatch {
		fmt.Println("PASSWORD DID NOT MATCH")
		fmt.Println(isMatch)
		context.JSON(http.StatusUnauthorized, gin.H{
			"message": "invalid credential",
		})

		return
	}

	tokenString, err := CreateToken(user.Email)

	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{
			"message": "error creating token",
		})
		return
	}

	context.JSON(http.StatusOK, gin.H{
		"data": tokenString,
	})
}

func CreateUser(context *gin.Context) {
	var createUser models.User
	db := database.GetDB()
	context.Bind(&createUser)
	hashed, _ := bcrypt.GenerateFromPassword([]byte(createUser.Password), bcrypt.DefaultCost)

	createUser.Password = string(hashed)
	createUser.Role = "customer"

	createUser.ID = uuid.NewString()
	fmt.Println(createUser)
	result := db.Create(&createUser)

	if result.Error != nil {
		fmt.Println(result.Error)
		context.JSON(http.StatusInternalServerError, gin.H{
			"message": "Interal Server Error",
		})
	}

	context.JSON(200, gin.H{
		"data": createUser,
	})
}

func GetAllUser (context *gin.Context){
	var users []models.User
	db := database.GetDB()
	db.Where("role LIKE ?", "customer").Find(&users)

	context.JSON(200, gin.H {
		"data": users,
	})
}

func BanHandleUser (context *gin.Context){
	var user models.User
	userID := context.Param("id")
	fmt.Println(userID)
	db := database.GetDB()
	db.Find(&user, "id = ?", userID)	

	if(user.Banned == "false") {
		user.Banned = "true"
		fmt.Println(user.Banned)
	}
	
	if user.Banned == "true" {
		user.Banned = "false"
	}

	context.JSON(200, gin.H {
		"data": user,
		"message" :"success",
	})
}
