package models

import "time"

type Otp struct {
	Email string
	Code  string
	Made  time.Time
}
