package seeders

import (
	"fmt"
	"log"

	"github.com/bxcodec/faker/v4"
	"github.com/nosurprisesplz/tpa-web-backend/models"
)

func LocationSeeder() {
	for i := 0; i < 10; i++ {
		var location models.Location
		err := faker.FakeData(&location)

		if err != nil {
			log.Fatal("FAILED FAKER DATA")
		}
		fmt.Println(location)
	}
}
