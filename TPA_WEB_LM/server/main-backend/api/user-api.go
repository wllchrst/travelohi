package api

import (
	"github.com/nosurprisesplz/tpa-web-backend/controllers/user"
	"github.com/nosurprisesplz/tpa-web-backend/enums"
	"github.com/nosurprisesplz/tpa-web-backend/initializer"
)

func CreateUserAPI() {
	engine := initializer.GetEngine()
	engine.POST(enums.REGISTER, user.CreateUser)
	engine.POST(enums.LOGIN, user.LoginUser)
	engine.PATCH(enums.UPDATE_PASSWORD, user.UpdatePassword)
	engine.GET(enums.AUTHENTICATION, user.Auth)
	engine.GET(enums.GET_ALL_USER, user.GetAllUser)
	engine.GET(enums.GET_USER_DETAIL, user.GetUserDetailByID)
	engine.PATCH(enums.BAN_HANDLE_USER, user.BanHandleUser)
	engine.GET(enums.LOGOUT, user.LogOut)
	engine.GET(enums.USER_SUBSCRIBE, user.UserSubcribe)
	engine.POST(enums.UPDATE_USER_INFORMATION, user.UpdateUserInformation)

	engine.POST(enums.ADD_BALANCE, user.AddUserWallet)
	
}
