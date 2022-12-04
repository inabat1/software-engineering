package controllers

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/inabatatkanova/Software-engineering/database"
	"github.com/inabatatkanova/Software-engineering/models"
)

func GetAppsOfDoc(c *fiber.Ctx) error {
	var doc models.Doctor
	var treats []models.Treatments

	intVal, err := strconv.Atoi(c.Params("docId"))
	if err != nil {
		return err
	}
	doc.ID = uint(intVal)
	database.DB.Take(&doc)

	database.DB.Where("doctor_id = ?", doc.ID).Find(&treats)

	return c.JSON(treats)
}

func UpdateTreatment(c *fiber.Ctx) error {
	var treat models.Treatments

	intVal, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return err
	}

	treat.ID = uint(intVal)
	database.DB.Take(&treat)

	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	treat.Treat = data["treat"]

	database.DB.Save(&treat)

	return c.JSON(treat)
}

func GetAllMedRecords(c *fiber.Ctx) error {
	var treats []models.Treatments

	database.DB.Order("ID desc").Find(&treats)

	return c.JSON(treats)
}

func GetHistoryOfPatient(c *fiber.Ctx) error {
	var treats []models.Treatments
	var patient models.User

	intVal, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return err
	}

	patient.ID = uint(intVal)
	database.DB.Take(&patient)

	database.DB.Where("user_iin = ?", patient.IIN_Number).Order("ID desc").Find(&treats)

	return c.JSON(treats)
}
