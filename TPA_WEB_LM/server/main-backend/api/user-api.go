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
	engine.GET(enums.AUTHENTICATION, user.Auth)
	engine.GET(enums.GET_ALL_USER, user.GetAllUser)
	engine.PATCH(enums.BAN_HANDLE_USER, user.BanHandleUser)
}
