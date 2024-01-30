package initializer

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

var engine *gin.Engine

func GetEngine() *gin.Engine {
	return engine
}

func InitGin() {
	engine = gin.Default()
	


	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowHeaders = []string{"Origin", "Content-Length", "contenttype", "content-type", "Authorization"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"}

	engine.Use(cors.New(config))
}
