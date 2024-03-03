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

	err := utils.ValidateEmail(loginData.Email)

	if err != nil {
		context.JSON(200, utils.Response(err.Error(), false))
		return
	}

	fmt.Println(loginData)

	result := db.First(&user, "email = ?", loginData.Email)

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

	user.IsLoggedIn = true

	db.Save(&user)

	context.JSON(http.StatusOK, gin.H{
		"data": tokenString,
	})
}

func CreateUser(context *gin.Context) {
	var createUser models.User
	db := database.GetDB()

	context.Bind(&createUser)
	createUser.Role = "customer"

	err := utils.ValidateUser(createUser)

	if err != nil {
		context.AbortWithStatusJSON(http.StatusOK, utils.Response(err.Error(), false))
		return
	}

	hashed, _ := bcrypt.GenerateFromPassword([]byte(createUser.Password), bcrypt.DefaultCost)

	createUser.Password = string(hashed)

	createUser.ID = uuid.NewString()

	createUser.Banned = false
	createUser.IsLoggedIn = false

	result := db.Create(&createUser)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response("Email has been used", false))
		return
	}

	// utils.EmailUser(createUser.Email, "williamqwerty3@gmail.com", "bitch")

	utils.SendEmail("Register Information", "You have successfully registered your account", createUser.Email)

	context.JSON(200, gin.H{
		"success": true,
	})
}

func GetAllUser(context *gin.Context) {
	var users []models.User
	db := database.GetDB()
	db.Where("role LIKE ?", "customer").Find(&users)

	context.JSON(200, gin.H{
		"data": users,
	})
}

func BanHandleUser(context *gin.Context) {
	var user models.User
	userID := context.Param("id")
	fmt.Println(userID)
	db := database.GetDB()
	db.Find(&user, "id = ?", userID)

	user.Banned = !user.Banned

	db.Save(&user)

	context.JSON(200, gin.H{
		"data":    user,
		"message": "success",
	})
}

func GetUserDetailByID(context *gin.Context) {
	var model models.User
	db := database.GetDB()
	id := context.Param("id")

	// ! Ganti yang di dalam string rating_id tergantung dengan primary key yang ada di database
	result := db.Find(&model, "email = ?", id)

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

type UpdatePasswordInput struct {
	Email                    string
	PersonalSecurityAnswer   string
	PersonalSecurityQuestion string
	NewPassword              string
	ConfirmNewPassword       string
}

func UpdatePassword(context *gin.Context) {
	var updatePassword UpdatePasswordInput
	var user models.User
	db := database.GetDB()

	context.Bind(&updatePassword)
	result := db.Find(&user, "email = ?", updatePassword.Email)

	if result.Error != nil {
		context.AbortWithStatusJSON(http.StatusOK, gin.H{
			"success": false,
		})
	}

	if user.Banned {
		context.JSON(200, utils.Response("You are banned", false))
		return
	}

	if updatePassword.PersonalSecurityQuestion != user.PersonalSecurityQuestion {
		context.JSON(http.StatusOK, utils.Response("Wrong Personal Security Question", false))
		return
	}

	// update
	if updatePassword.ConfirmNewPassword != updatePassword.NewPassword {
		context.AbortWithStatusJSON(http.StatusOK, utils.Response("password doesnt match", false))
		return
	}

	hashed, _ := bcrypt.GenerateFromPassword([]byte(updatePassword.NewPassword), bcrypt.DefaultCost)

	matched := utils.ValidatePassword(updatePassword.NewPassword, user.Password)

	if matched {
		context.AbortWithStatusJSON(http.StatusOK, utils.Response("password same with old password", false))
		return
	}

	if user.PersonalSecurityAnswer != updatePassword.PersonalSecurityAnswer {
		context.AbortWithStatusJSON(http.StatusOK, utils.Response("wrong personal security answer", false))
		return
	}

	user.Password = string(hashed)

	db.Save(&user)

	context.JSON(200, utils.Response("mantap", true))
}

func LogOut(context *gin.Context) {
	var user models.User
	id := context.Param("id")
	db := database.GetDB()

	result := db.Find(&user, "id = ?", id)

	if result.Error != nil {
		context.JSON(http.StatusBadRequest, false)
		return
	}

	user.IsLoggedIn = false

	result = db.Save(&user)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, false)
		return
	}

	context.JSON(200, utils.Response("mantap", true))
}

func UpdateUserInformation(context *gin.Context) {
	var userInput models.User
	var user models.User
	db := database.GetDB()

	context.Bind(&userInput)

	fmt.Println(userInput.Email)
	err := utils.ValidateUser(userInput)

	if err != nil {
		context.JSON(http.StatusBadRequest, utils.Response(err.Error(), false))
		return
	}

	result := db.Find(&user, "id = ?", userInput.ID)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
	}

	user.Email = userInput.Email
	user.FirstName = userInput.FirstName
	user.LastName = userInput.LastName
	user.ProfilePictureLink = userInput.ProfilePictureLink

	db.Save(&user)

	context.JSON(http.StatusOK, utils.Response("mantap", true))
}

func UserSubcribe(context *gin.Context) {
	var user models.User
	db := database.GetDB()

	id := context.Param("id")
	result := db.Find(&user, "id = ?", id)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	user.IsSubscribed = !user.IsSubscribed

	db.Save(&user)

	context.JSON(http.StatusOK, utils.Response("ok", true))
}

func AddUserWallet(context *gin.Context) {
	var user models.User
	db := database.GetDB()
	id := context.Param("id")

	db.Find(&user, "id = ?", id)

	user.Wallet += 10

	db.Save(&user)

	context.JSON(http.StatusOK, utils.Response("ok", true))
}

func AdminSendEmail(context *gin.Context) {
	db := database.GetDB()
	var email models.Email
	var users []models.User

	result := db.Find(&users)

	if result.Error != nil {
		context.JSON(200, utils.Response(result.Error.Error(), false))
		return
	}

	context.Bind(&email)

	fmt.Println(email)

	if email.Body == "" || email.Subject == "" {
		context.JSON(http.StatusBadRequest, utils.Response("Body and Subject cannot be emtpy", false))
		return
	}

	for _, user := range users {
		utils.SendEmail(email.Body, email.Subject, user.Email)
	}

	context.JSON(200, utils.Response("mantap", true))
}
