package utils

import (
	"errors"
	"fmt"
	"log"
	"regexp"
	"time"

	"github.com/nosurprisesplz/tpa-web-backend/models"
	"golang.org/x/crypto/bcrypt"
	"gopkg.in/mail.v2"
)

func ValidatePassword(inputPassword string, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(password), []byte(inputPassword))

	return err == nil
}

func CalculateAge(dob time.Time) bool {
	currentTime := time.Now()
	age := currentTime.Year() - dob.Year()

	// Adjust age if birthday hasn't occurred yet this year
	if currentTime.YearDay() < dob.YearDay() {
		age--
	}
	fmt.Println(age)
	return age >= 13
}
func ValidateUser(user models.User) error {
	if user.Email == "" {
		return errors.New("Email is required")
	}

	err := ValidateEmail(user.Email)

	if err != nil {
		return err
	}

	if user.Password == "" {
		return errors.New("Password is required")
	}
	if user.FirstName == "" {
		return errors.New("FirstName is required")
	}
	if user.LastName == "" {
		return errors.New("LastName is required")
	}
	if user.DOB.IsZero() {
		return errors.New("DOB is required")
	}
	if user.Gender == "" {
		return errors.New("Gender is required")
	}
	if user.ProfilePictureLink == "" {
		return errors.New("ProfilePictureLink is required")
	}
	if user.PersonalSecurityQuestion == "" {
		return errors.New("PersonalSecurityQuestion is required")
	}
	if user.PersonalSecurityAnswer == "" {
		return errors.New("PersonalSecurityAnswer is required")
	}
	if user.Role == "" {
		return errors.New("Role is required")
	}

	if !(user.PersonalSecurityQuestion == "What is your favorite childhood pet's name" || user.PersonalSecurityQuestion == "In which city where you born" || user.PersonalSecurityQuestion == "What is the name of your favorite book or movie?" || user.PersonalSecurityQuestion == "What is the name of the elementary school you attended?" || user.PersonalSecurityQuestion == "What is the model of your first car?") {
		return errors.New("wrong personal security question")
	}

	if !CalculateAge(user.DOB) {
		return errors.New("age must be more than 13")
	}

	if !isValidEmail(user.Email) {
		return errors.New("invalid email format")
	}

	if len(user.FirstName) <= 5 && len(user.LastName) <= 5 {
		return errors.New("first name and last name must be more than 5")
	}

	if user.Gender != "Male" && user.Gender != "Female" {
		return errors.New("gender must be male or female")
	}

	return nil
}

func isValidEmail(email string) bool {
	// Regular expression for a simple email format validation
	emailRegex := `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`
	match, _ := regexp.MatchString(emailRegex, email)
	return match
}

func EmailUser(fromEmail string, toEmail string, message string) {
	sender := mail.NewMessage()
	sender.SetHeader("From", fromEmail)
	sender.SetHeader("To", toEmail)
	sender.SetHeader("Subject", "Registration Information")

	sender.SetBody("text/plain", message)
	dialer := mail.NewDialer(
		"smtp.gmail.com",           // SMTP server address
		587,                        // Port for the SMTP server (587 is commonly used for TLS)
		"williamqwerty3@gmail.com", // Your email address
		"AllApologies710",          // Your email password
	)

	if err := dialer.DialAndSend(sender); err != nil {
		log.Fatal(err)
	} else {
		log.Println("Email sent successfully!")
	}
}

func ValidateEmail(email string) error {
	// Regular expression pattern for email validation
	pattern := `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`

	// Compile the pattern into a regular expression
	regex := regexp.MustCompile(pattern)

	// Use the MatchString method to check if the email matches the pattern
	if regex.MatchString(email) {
		return nil
	} else {
		return errors.New("Email format is wrong")
	}

}
func ValidateCreditCard(card models.CreditCard) error {
	// Check if CreditCardID is empty
	if card.CreditCardID == "" {
		return errors.New("CreditCardID cannot be empty")
	}

	// Check if CreditCardNumber is empty
	if card.CreditCardNumber == "" {
		return errors.New("CreditCardNumber cannot be empty")
	}

	// Check if BankName is empty
	if card.BankName == "" {
		return errors.New("BankName cannot be empty")
	}

	// Check if UserRefer is empty
	if card.UserRefer == "" {
		return errors.New("UserRefer cannot be empty")
	}

	return nil
}
