package utils

import "golang.org/x/crypto/bcrypt"

func ValidatePassword(inputPassword string, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(password), []byte(inputPassword))

	return err == nil
}
