package user

import (
	"errors"
	"fmt"
	"net/http"
	"os"
	"sort"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
	"github.com/nosurprisesplz/tpa-web-backend/database"
	"github.com/nosurprisesplz/tpa-web-backend/models"
	"github.com/nosurprisesplz/tpa-web-backend/utils"
	"gorm.io/gorm"
)

var userSearches []models.UserSearch

func Auth(context *gin.Context) {
	tokenString := context.Param("token")
	claims := &CustomClaims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return os.Getenv("SIGNING_KEY"), nil
	})

	if err != nil {
		fmt.Println(err)
	}

	if !token.Valid {
		fmt.Println(token)
	}

	var user models.User

	db := database.GetDB()

	result := db.Preload("CreditCards").First(&user, "email = ?", claims.Email)

	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		context.JSON(401, gin.H{
			"message": "invalid credentials",
		})
	}

	if result.Error != nil {
		context.JSON(http.StatusUnauthorized, gin.H{
			"message": "failed getting information",
		})
	}

	context.JSON(200, gin.H{
		"data": user,
	})
}

func Recommendation(context *gin.Context) {
	var recommendations []string
	var hotels []models.Hotel
	email := context.Param("email")

	db := database.GetDB()

	result := db.Model(&models.Hotel{}).
		Preload("Location").
		Preload("HotelPictures").
		Preload("HotelFacilities").
		Preload("Ratings").
		Select("hotels.*, COUNT(hotel_tickets.hotel_refer) AS booking_count").
		Joins("LEFT JOIN hotel_tickets ON hotels.hotel_id = hotel_tickets.hotel_refer").
		Group("hotels.hotel_id").
		Order("booking_count DESC").
		Limit(5).
		Find(&hotels)

	if result.Error != nil {
		context.JSON(200, utils.Response(result.Error.Error(), false))
		return
	}
	var popularDestinations []struct {
		AirportCodeDestination string
		VisitCount             int
	}
	result = db.Model(&models.Flight{}).
		Select("airport_code_destination, COUNT(airport_code_destination) AS visit_count").
		Group("airport_code_destination").
		Order("visit_count DESC").
		Limit(5).
		Find(&popularDestinations)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	var airportCodes []string
	for _, dest := range popularDestinations {
		airportCodes = append(airportCodes, dest.AirportCodeDestination)
	}

	var flights []models.Flight

	result = db.Model(&models.Flight{}).
		Preload("Airline").
		Preload("AirportDestination").
		Preload("AirportDestination.Location").
		Preload("AirportOrigin.").
		Preload("AirportOrigin.Location").
		Preload("Transits").
		Preload("FlightSeats").
		Where("airport_code_destination IN ?", airportCodes).
		Find(&flights)

	if result.Error != nil {
		context.JSON(http.StatusInternalServerError, utils.Response(result.Error.Error(), false))
		return
	}

	counter := 0

	fmt.Println(len(hotels), " ", len(flights))

	for i := 0; i < len(hotels); i++ {
		if counter > 3 {
			break
		}
		counter++
		fmt.Println("hotel name ", hotels[i].HotelName)
		recommendations = append(recommendations, hotels[i].HotelName)
	}

	for i := 0; i < len(flights); i++ {
		if counter > 5 {
			break
		}
		fmt.Println(flights[i].AirportDestination.AirportName)
		counter++
		recommendations = append(recommendations, flights[i].AirportDestination.AirportName)
	}

	histories := GetThreeMostRecentSearches(userSearches, email)

	for _, history := range histories {
		recommendations = append(recommendations, history.SearchQuery)
	}

	recommendations = RemoveDuplicates(recommendations)

	context.JSON(200, utils.DataResponse(recommendations, "search recommendation", true))
}
func RemoveDuplicates(arr []string) []string {
	// Create a map to store the occurrence of each string
	seen := make(map[string]bool)

	// Create a new slice to store unique strings
	unique := make([]string, 0)

	// Iterate through the array
	for _, str := range arr {
		// If the string is not seen yet, add it to the unique slice
		if !seen[str] {
			unique = append(unique, str)
			seen[str] = true
		}
	}

	return unique
}
func SearchQuery(context *gin.Context) {
	var results []string
	var flights []models.Flight
	var hotels []models.Hotel
	query := context.Param("query")

	db := database.GetDB()

	result := db.Model(&models.Flight{}).
		Preload("AirportDestination", "airport_name LIKE ?", "%"+query+"%").
		Find(&flights)

	if result.Error != nil {
		context.JSON(200, utils.Response(result.Error.Error(), false))
		return
	}

	result = db.Model(&models.Hotel{}).
		Preload("Location").
		Preload("HotelPictures").
		Preload("HotelFacilities").
		Preload("Ratings").Where("hotel_name LIKE ?", "%"+query+"%").
		Find(&hotels)

	if result.Error != nil {
		context.JSON(200, utils.Response(result.Error.Error(), false))
		return
	}

	for i := 0; i < len(hotels); i++ {
		if hotels[i].HotelName == "" {
			continue
		}
		results = append(results, hotels[i].HotelName)
	}

	for i := 0; i < len(flights); i++ {
		if flights[i].AirportDestination.AirportName == "" {
			continue
		}
		results = append(results, flights[i].AirportDestination.AirportName)
	}

	context.JSON(200, utils.DataResponse(results, "search query", true))
}

func AddSearchHistory(context *gin.Context) {
	var search models.UserSearch

	search.TimeSearch = time.Now()

	context.Bind(&search)

	userSearches = append(userSearches, search)

	context.JSON(200, utils.Response("added history", true))
}

// ByTime implements sort.Interface for []UserSearch based on the TimeSearch field.
type ByTime []models.UserSearch

func (a ByTime) Len() int           { return len(a) }
func (a ByTime) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }
func (a ByTime) Less(i, j int) bool { return a[i].TimeSearch.After(a[j].TimeSearch) }

// GetThreeMostRecentSearches returns the three most recent searches from the provided list.
func GetThreeMostRecentSearches(searches []models.UserSearch, email string) []models.UserSearch {
	if len(searches) == 0 {
		return nil
	}

	// Sort searches by time in descending order
	sort.Sort(ByTime(searches))

	// Take the first three searches if available
	var recentSearches []models.UserSearch
	counter := 0
	for i := 0; i < len(searches) && counter < 3; i++ {
		if searches[i].Email == email {
			recentSearches = append(recentSearches, searches[i])
			counter++
		}
	}

	return recentSearches
}
