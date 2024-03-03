package models

import "time"

type UserSearch struct {
	Email       string
	SearchQuery string
	TimeSearch  time.Time
}
