package main

import (
	"github.com/nosurprisesplz/tpa-web-backend/database"
	"github.com/nosurprisesplz/tpa-web-backend/facade"
	"github.com/nosurprisesplz/tpa-web-backend/initializer"
)

func init() {
	initializer.InitGin()
	database.ConnectToDB()
	database.Migrate()
	facade.CraeteAPIFacade()
	facade.ExecuteSeeders()
}

func main() {
	engine := initializer.GetEngine()
	engine.Run()
}
