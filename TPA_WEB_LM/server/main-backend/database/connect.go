package database

import (
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB
var err error

func GetDB() *gorm.DB {
	return db
}

func ConnectToDB() {
	dsn := "host=localhost user=postgres password= dbname=postgres port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("ERROR CONNECTING TO DB")
	}

	fmt.Println(db)
}
