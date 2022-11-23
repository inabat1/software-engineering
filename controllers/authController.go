package controllers

import (
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"github.com/soolllv/densys_milestone2/database"
	"github.com/soolllv/densys_milestone2/models"
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
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	doctor := models.Doctor{
		Name:           data["name"],
		Surname:        data["surname"],
		MiddleName:     data["middleName"],
		DataOfBirth:    data["dateOfBirth"],
		IIN_Number:     data["iinNum"],
		ID_Number:      data["idNum"],
		ContactNumber:  data["contactNum"],
		Address:        data["address"],
		Department:     data["department"],
		Specialization: data["specialization"],
		Experience:     data["experience"],
		Photo:          data["photo"],
		Category:       data["category"],
		Price:          data["price"],
		Schedule:       data["schedule"],
		Degree:         data["degree"],
		Rating:         data["rating"],
	}

	database.DB.Create(&doctor)

	return c.JSON(doctor)
}

func EditDoctor(c *fiber.Ctx) error {
	// database.DB.First(c.Params("id"));
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	var curDoc models.Doctor
	intVal, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return err
	}
	curDoc.ID = uint(intVal)
	database.DB.Take(&curDoc)

	curDoc.Name = data["name"]
	curDoc.Surname = data["surname"]
	curDoc.MiddleName = data["middleName"]
	curDoc.DataOfBirth = data["dateOfBirth"]
	curDoc.IIN_Number = data["iinNum"]
	curDoc.ID_Number = data["idNum"]
	curDoc.ContactNumber = data["contactNum"]
	curDoc.Address = data["address"]
	curDoc.Department = data["department"]
	curDoc.Specialization = data["specialization"]
	curDoc.Experience = data["experience"]
	curDoc.Photo = data["photo"]
	curDoc.Category = data["category"]
	curDoc.Price = data["price"]
	curDoc.Schedule = data["schedule"]
	curDoc.Degree = data["degree"]
	curDoc.Rating = data["rating"]

	database.DB.Save(&curDoc)
	return c.JSON(curDoc)
}

func GetDoctor(c *fiber.Ctx) error {

	// var curDoc map[string]string
	var curDoc models.Doctor
	intVal, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return err
	}
	curDoc.ID = uint(intVal)
	database.DB.Take(&curDoc)

	return c.JSON(curDoc)

}

func GetUser(c *fiber.Ctx) error {

	// var curDoc map[string]string
	var curUser models.User
	intVal, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return err
	}
	curUser.ID = uint(intVal)
	database.DB.Take(&curUser)

	return c.JSON(curUser)

}
func EditUser(c *fiber.Ctx) error {
	// database.DB.First(c.Params("id"));
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	var curUser models.User
	intVal, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return err
	}
	curUser.ID = uint(intVal)
	database.DB.Take(&curUser)

	curUser.Name = data["name"]
	curUser.Surname = data["surname"]
	curUser.MiddleName = data["middleName"]
	curUser.DataOfBirth = data["dateOfBirth"]
	curUser.IIN_Number = data["iinNum"]
	curUser.ID_Number = data["idNum"]
	curUser.ContactNumber = data["contactNum"]
	curUser.Address = data["address"]
	curUser.Email = data["email"]
	curUser.BloodGroup = data["bloodGroup"]
	curUser.EmerContactNumber = data["emerContactNum"]
	curUser.MaritalStatus = data["maritalSts"]

	database.DB.Save(&curUser)
	return c.JSON(curUser)
}

func ListDoctors(c *fiber.Ctx) error {
	var docs []models.Doctor
	database.DB.Find(&docs)

	return c.JSON(docs)
}

func ListUsers(c *fiber.Ctx) error {
	var users []models.User
	database.DB.Find(&users)

	return c.JSON(users)
}

func DeleteDoctor(c *fiber.Ctx) error {
	var Doc models.Doctor
	database.DB.Delete(&Doc, c.Params("id"))
	return nil
}

func DeleteUser(c *fiber.Ctx) error {
	var User models.User
	database.DB.Delete(&User, c.Params("id"))
	return nil
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
