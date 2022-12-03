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

func EditDoctor(c *fiber.Ctx) error {
	var changedDoc models.Doctor
	if err := c.BodyParser(&changedDoc); err != nil {
		return err
	}

	var curDoc models.Doctor
	intVal, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return err
	}
	curDoc.ID = uint(intVal)
	database.DB.Take(&curDoc)

	// curDoc = changedDoc
	curDoc.Name = changedDoc.Name
	curDoc.Surname = changedDoc.Surname
	curDoc.MiddleName = changedDoc.MiddleName
	curDoc.DataOfBirth = changedDoc.DataOfBirth
	curDoc.IIN_Number = changedDoc.IIN_Number
	curDoc.ID_Number = changedDoc.ID_Number
	curDoc.ContactNumber = changedDoc.ContactNumber
	curDoc.Address = changedDoc.Address
	curDoc.Department = changedDoc.Department
	curDoc.Specialization = changedDoc.Specialization
	curDoc.Experience = changedDoc.Experience
	curDoc.Photo = changedDoc.Photo
	curDoc.Category = changedDoc.Category
	curDoc.Price = changedDoc.Price
	curDoc.Schedule = changedDoc.Schedule
	curDoc.Degree = changedDoc.Degree
	curDoc.Rating = changedDoc.Rating

	database.DB.Save(&curDoc)
	return c.JSON(curDoc)
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

func GetTimeSlots(s string, x int) [14]int {
	arr := [14]int{}
	j := 0
	for i := (x - 1) * 14; i < x*14; i++ {
		arr[j] = int(s[i] - '0')
		j++
	}

	return arr
}

func GetScheduleOfDoc(c *fiber.Ctx) error {
	var doc models.Doctor
	intVal, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return err
	}

	dateVal, err := strconv.Atoi(c.Params("schd"))
	if err != nil {
		return err
	}

	doc.ID = uint(intVal)

	database.DB.Take(&doc)

	arr := GetTimeSlots(doc.Schedule, dateVal)

	return c.JSON(arr)
}

// func for request
func PostAppointment(c *fiber.Ctx) error {
	var patient models.User
	var doc models.Doctor

	intVal, err := strconv.Atoi(c.Params("docId"))
	if err != nil {
		return err
	}

	timeVal, err := strconv.Atoi(c.Params("schd"))
	if err != nil {
		return err
	}

	database.DB.Where("Email = ?", c.Params("email")).Take(&patient)
	if patient.Email != c.Params("email") {
		return c.JSON(fiber.Map{
			"message": "Could not find user",
		})
	}

	database.DB.Where("ID = ?", intVal).Take(&doc)
	if intVal != int(doc.ID) {
		return c.JSON(fiber.Map{
			"message": "Could not find doctor",
		})
	}

	var app models.Schedules

	app.Approved = 0
	app.DoctorName = doc.Name
	app.DoctorSurname = doc.Surname
	app.DoctorID = uint(intVal)
	app.AppTime = uint(timeVal)
	app.UserIIN = patient.IIN_Number
	app.UserName = patient.Name
	app.UserSurname = patient.Surname

	doc.Schedule = doc.Schedule[:app.AppTime] + "3" + doc.Schedule[app.AppTime+1:]

	database.DB.Save(&doc)

	database.DB.Create(&app)

	return c.JSON(app)
}

// func to get req (Admin)
func GetAppointment(c *fiber.Ctx) error {
	var apps []models.Schedules

	database.DB.Where("Approved = ?", 0).Find(&apps)

	return c.JSON(apps)
}

// func to update req (Admin)
func UpdateAppointment(c *fiber.Ctx) error {
	var doc models.Doctor
	var app models.Schedules

	intVal, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return err
	}

	app.ID = uint(intVal)
	database.DB.Take(&app)

	database.DB.Where("ID = ?", app.DoctorID).Take(&doc)

	doc.Schedule = doc.Schedule[:app.AppTime] + "1" + doc.Schedule[app.AppTime+1:]

	database.DB.Save(&doc)

	app.Approved = 1

	database.DB.Save(&app)

	return c.JSON(fiber.Map{
		"prev": doc.Schedule,
		"cur":  app.Approved,
	})
}

func RejectAppointment(c *fiber.Ctx) error {
	var doc models.Doctor
	var app models.Schedules

	intVal, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return err
	}

	app.ID = uint(intVal)
	database.DB.Take(&app)

	database.DB.Where("ID = ?", app.DoctorID).Take(&doc)

	doc.Schedule = doc.Schedule[:app.AppTime] + "0" + doc.Schedule[app.AppTime+1:]

	database.DB.Save(&doc)

	app.Approved = 1

	database.DB.Save(&app)

	return c.JSON(fiber.Map{
		"prev": doc.Schedule,
		"cur":  app.Approved,
	})
}
