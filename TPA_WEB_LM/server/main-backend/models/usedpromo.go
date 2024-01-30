package models

type UsedPromo struct {
	PromoID string `gorm:"primaryKey"`
	UserID  string `gorm:"primaryKey"`
}
