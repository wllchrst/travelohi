package utils

import (
	"errors"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/nosurprisesplz/tpa-web-backend/models"
)

func Response(message string, success bool) gin.H {
	return gin.H{
		"message": message,
		"success": success,
	}
}

func DataResponse(data any, message string, success bool) gin.H {
	return gin.H{
		"message": message,
		"success": success,
		"data":    data,
}
}
func ValidatePromo(promo models.Promo) error {
	if promo.ID == "" {
		return errors.New("ID is required")
	}

	if promo.PromoCode == "" {
		return errors.New("PromoCode is required")
	}

	if promo.PictureLink == "" {
		return errors.New("PictureLink is required")
	}

	if promo.DiscountValue <= 0 {
		return errors.New("DiscountValue must be greater than zero")
	}

	return nil
}

func DaysBetween(startDate, endDate time.Time) int {
	// To calculate the difference between two dates,
	// we take the difference in Unix time and convert it to days.
	duration := endDate.Sub(startDate)
	days := int(duration.Hours() / 24)
	return days
}
