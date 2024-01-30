package user

import (
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
)

type CustomClaims struct {
	Email string
	jwt.StandardClaims
}

func CreateToken(Email string) (string, error) {
	claims := CustomClaims{
		Email: Email,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 2).Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString([]byte(os.Getenv("SIGNING_KEY")))

	if err != nil {
		return "", err
	}

	return tokenString, nil
}
