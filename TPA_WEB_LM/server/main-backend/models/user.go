package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID                       string `gorm:"primaryKey" faker:"uuid_hyphenated"`
	Email                    string `faker:"email"`
	Password                 string `faker:"password"`
	FirstName                string `faker:"first_name"`
	LastName                 string `faker:"last_name"`
	DOB                      time.Time
	Gender                   string
	ProfilePictureLink       string
	PersonalSecurityQuestion string
	PersonalSecurityAnswer   string
	Role                     string
	Banned                   string
}

type LoginUser struct {
	Email    string
	Password string
}
