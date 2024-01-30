package seeders

import (
	"time"

	"github.com/bxcodec/faker/v4"
	"github.com/google/uuid"
	"github.com/nosurprisesplz/tpa-web-backend/models"
)

// ID                       string `gorm:"primaryKey" faker:"uuid_hyphenated"`
//
//	Email                    string `faker:"email"`
//	Password                 string `faker:"password"`
//	FirstName                string `faker:"first_name"`
//	LastName                 string `faker:"last_name"`
//	DOB                      time.Time
func UserSeeder() {
	// db := database.GetDB()
	for i := 0; i < 20; i++ {
		var user models.User
		user.Email = faker.Email()
		user.Password = faker.Password()
		user.FirstName = faker.FirstName()
		user.LastName = faker.LastName()
		user.DOB = time.Now()
		user.Gender = "Male"
		user.ProfilePictureLink = "https://firebasestorage.googleapis.com/v0/b/travelohi-72fda.appspot.com/o/images%2FS__133595141_0.jpg?alt=media&token=c83bd18c-0db7-466a-b4f2-15f2d447dd40"
		user.PersonalSecurityAnswer = "test"
		user.PersonalSecurityQuestion = "test"
		user.Role = "customer"
		user.ID = uuid.NewString()
		user.Banned = "false"
		// db.Create(&user)
	}
}
