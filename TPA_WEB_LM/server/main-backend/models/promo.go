package models

type Promo struct {
	ID            string `gorm:"primaryKey"`
	PromoCode     string `gorm:"unique"`
	PictureLink   string
	DiscountValue int
}
