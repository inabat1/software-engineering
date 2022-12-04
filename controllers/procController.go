package controllers

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/inabatatkanova/Software-engineering/database"
	"github.com/inabatatkanova/Software-engineering/models"
)

func GetProcedure(c *fiber.Ctx) error {
	var procs []models.Procedures

	prName := c.Params("name")

	database.DB.Where("ProcedureName = ?", prName).Find(&procs)

	return c.JSON(procs)
}

func AddProcedure(c *fiber.Ctx) error {
	var proc models.Procedures

	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	proc.ProcedureName = data["name"]
	proc.Schedule = data["proc_schedule"]

	database.DB.Create(&proc)

	return c.JSON(proc)
}

func GetAppTimeSlots(s string, x int) [10]int {
	arr := [10]int{}
	j := 0
	for i := (x - 1) * 10; i < x*10; i++ {
		arr[j] = int(s[i] - '0')
		j++
	}
	return arr
}

func GetScheduleOfProc(c *fiber.Ctx) error {
	var proc models.Procedures
	intVal, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return err
	}
	dateVal, err := strconv.Atoi(c.Params("schd"))
	if err != nil {
		return err
	}
	proc.ID = uint(intVal)

	database.DB.Take(&proc)

	arr := GetTimeSlots(proc.Schedule, dateVal)

	return c.JSON(arr)
}

func RegAppointmentForProc(c *fiber.Ctx) error {
	var app models.AppOnProcedure
	var patient models.User
	var proc models.Procedures

	database.DB.Where("Email = ?", c.Params("email")).Take(&patient)
	if patient.Email != c.Params("email") {
		return c.JSON(fiber.Map{
			"message": "Could not find user",
		})
	}

	intVal, err := strconv.Atoi(c.Params("procId"))
	if err != nil {
		return err
	}

	timeVal, err := strconv.Atoi(c.Params("time"))
	if err != nil {
		return err
	}

	database.DB.Where("ID = ?", intVal).Take(&proc)
	if intVal != int(proc.ID) {
		return c.JSON(fiber.Map{
			"message": "Could not find procedure",
		})
	}

	app.ProcedureName = proc.ProcedureName
	app.UserIIN = patient.IIN_Number
	app.UserName = patient.Name
	app.UserSurname = patient.Surname
	app.AppTime = uint(timeVal)
	app.Approved = 0

	proc.Schedule = proc.Schedule[:app.AppTime] + "3" + proc.Schedule[app.AppTime+1:]

	database.DB.Create(&app)

	return c.JSON(app)
}

func GetProcAppointments(c *fiber.Ctx) error {
	var apps []models.AppOnProcedure

	database.DB.Where("Approved = ?", 0).Find(&apps)

	return c.JSON(apps)
}

// func to update req (Admin)
func ConfirmProcAppointment(c *fiber.Ctx) error {
	var proc models.Procedures
	var app models.AppOnProcedure

	intVal, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return err
	}

	app.ID = uint(intVal)
	database.DB.Take(&app)

	database.DB.Where("ProcedureName = ?", app.ProcedureName).Take(&proc)

	proc.Schedule = proc.Schedule[:app.AppTime] + "1" + proc.Schedule[app.AppTime+1:]

	database.DB.Save(&proc)

	app.Approved = 1

	database.DB.Save(&app)

	return c.JSON(fiber.Map{
		"prev": proc.Schedule,
		"cur":  app.Approved,
	})
}

func RejectProcAppointment(c *fiber.Ctx) error {
	var proc models.Procedures
	var app models.AppOnProcedure

	intVal, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return err
	}

	app.ID = uint(intVal)
	database.DB.Take(&app)

	database.DB.Where("ProcedureName = ?", app.ProcedureName).Take(&proc)

	proc.Schedule = proc.Schedule[:app.AppTime] + "0" + proc.Schedule[app.AppTime+1:]

	database.DB.Save(&proc)

	app.Approved = 1

	database.DB.Save(&app)

	return c.JSON(fiber.Map{
		"prev": proc.Schedule,
		"cur":  app.Approved,
	})
}
