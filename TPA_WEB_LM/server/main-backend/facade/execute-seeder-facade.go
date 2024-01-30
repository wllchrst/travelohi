package facade

import "github.com/nosurprisesplz/tpa-web-backend/seeders"

func ExecuteSeeders() {
	// seeders.LocationSeeder()
	seeders.CreateAirportSeeder()
	seeders.UserSeeder()
}
