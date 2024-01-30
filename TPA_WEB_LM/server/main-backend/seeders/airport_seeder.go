package seeders

import (
	"fmt"

	"github.com/bxcodec/faker/v4"
	"github.com/nosurprisesplz/tpa-web-backend/database"
	"github.com/nosurprisesplz/tpa-web-backend/models"
)

func CreateAirportSeeder() {
	var locations []models.Location
	db := database.GetDB()
	db.Find(&locations)
	for i := 0; i < 10; i++ {
		var airport models.Airport
		err := faker.FakeData(&airport)
		if err != nil {
			fmt.Println(err)
		}
		airport.LocationID = locations[i].LocationID
		// db.Create(&airport)
	}
}
