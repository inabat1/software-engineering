package controllers

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/inabatatkanova/Software-engineering/database"
	"github.com/inabatatkanova/Software-engineering/models"
)

func SearchDocByName(c *fiber.Ctx) error {

	var curDoc []models.Doctor

	database.DB.Where("Name = ?", c.Params("name")).Find(&curDoc)

	return c.JSON(curDoc)
}

func SearchDocBySpec(c *fiber.Ctx) error {

	var curDoc []models.Doctor

	database.DB.Where("Specialization = ?", c.Params("spec")).Find(&curDoc)

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
