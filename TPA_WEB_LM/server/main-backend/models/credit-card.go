package models

type CreditCard struct {
	CreditCardID     string `gorm:"primaryKey"`
	CreditCardNumber string
	BankName         string
	UserRefer        string
}
