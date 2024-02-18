package models

type FetchSearch struct {
	UserID string `json:"UserID"`
	Query  string `json:"Query"`
	Past   bool
}
