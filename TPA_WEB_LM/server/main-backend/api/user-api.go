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
	engine.GET(enums.GET_OTP, user.GetOTP)
	engine.GET(enums.OTP_LOGIN, user.LoginUsingOTP)

	engine.GET(enums.SEARCH_RECOMMENDATION, user.Recommendation)
	engine.GET(enums.SEARCH_QUERY, user.SearchQuery)

	engine.POST(enums.ADD_SEARCH_HISTORY, user.AddSearchHistory)
	engine.POST(enums.ADMIN_EMAIL, user.AdminSendEmail)
}
