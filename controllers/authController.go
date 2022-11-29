package controllers

import (
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"github.com/inabatatkanova/Software-engineering/database"
	"github.com/inabatatkanova/Software-engineering/models"
	"golang.org/x/crypto/bcrypt"
)

func RegisterUser(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	user := models.User{
		Name:              data["name"],
		Surname:           data["surname"],
		MiddleName:        data["middleName"],
		DataOfBirth:       data["dateOfBirth"],
		IIN_Number:        data["iinNum"],
		ID_Number:         data["idNum"],
		ContactNumber:     data["contactNum"],
		Address:           data["address"],
		Email:             data["email"],
		BloodGroup:        data["bloodGroup"],
		EmerContactNumber: data["emerContactNum"],
		MaritalStatus:     data["maritalSts"],
	}

	database.DB.Create(&user)

	return c.JSON(user)
}

func RegisterDoctor(c *fiber.Ctx) error {
	var doctor models.Doctor

	if err := c.BodyParser(&doctor); err != nil {
		return err
	}

	database.DB.Create(&doctor)

	return c.JSON(doctor)
}


func RegAdmin(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)

	admin := models.Admin{
		Username: data["username"],
		Password: password,
	}

	database.DB.Create(&admin)

	return c.JSON(admin)
}

func LogAdmin(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	var admin models.Admin
	// admin.Id = 1
	database.DB.Where("username = ?", data["username"]).First(&admin)
	// database.DB.Take(&admin)

	if err := bcrypt.CompareHashAndPassword(admin.Password, []byte(data["password"])); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Incorrect Password",
		})
	}

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    strconv.Itoa(int(admin.Id)),
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	})

	token, err := claims.SignedString([]byte("secret"))

	if err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Could not login",
		})
	}

	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(token)
}

func AdminPage(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")

	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte("secret"), nil
	})

	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "unauthorized",
		})
	}

	claims := token.Claims.(*jwt.StandardClaims)

	var admin models.Admin

	database.DB.Where("id = ?", claims.Issuer).First(&admin)

	return c.JSON(admin)

}

func AdminLogout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "successfully logged out",
	})
}

func Hello(c *fiber.Ctx) error {
	return c.SendString("SUP mate")
}
