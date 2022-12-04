package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/inabatatkanova/Software-engineering/controllers"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")
	proc := app.Group("/api/proc")
	med := app.Group("/api/med")

	api.Post("/register-user", controllers.RegisterUser)
	api.Post("/register-doctor", controllers.RegisterDoctor)
	api.Get("/users", controllers.ListUsers)
	api.Get("/users/:id", controllers.GetUser)
	api.Delete("/users/:id", controllers.DeleteUser)
	api.Put("/users/:id", controllers.EditUser)
	api.Get("/doctors", controllers.ListDoctors)
	api.Get("/doctors/:id", controllers.GetDoctor)
	api.Delete("/doctors/:id", controllers.DeleteDoctor)
	api.Put("/doctors/:id", controllers.EditDoctor)
	app.Post("/log-admin", controllers.LogAdmin)
	app.Post("/reg-admin", controllers.RegAdmin)
	app.Get("/admin-page", controllers.AdminPage)
	app.Post("/logout-admin", controllers.Logout)
	api.Get("/doctors-name/:name", controllers.SearchDocByName)
	api.Get("/doctors-spec/:spec", controllers.SearchDocBySpec)
	api.Get("/doctor-data/:id/:schd", controllers.GetScheduleOfDoc)
	api.Post("/appointment/:email/:docId/:day/:time", controllers.PostAppointment)
	api.Get("/admin/appointments", controllers.GetAppointment)
	api.Post("/admin/appointment/:id", controllers.UpdateAppointment)
	api.Post("/admin/appointment/reject/:id", controllers.RejectAppointment)

	proc.Get("/:id/:schd", controllers.GetScheduleOfProc)
	proc.Post("/appointment/:email/:procId/:time", controllers.AddProcedure)
	proc.Get("/appointments", controllers.GetProcAppointments)
	proc.Post("/appointment/:id", controllers.ConfirmProcAppointment)
	proc.Post("/appointment/reject/:id", controllers.RejectProcAppointment)

	med.Get("/doctor/:docId", controllers.GetAppsOfDoc)
	med.Post("/treat/:id", controllers.UpdateTreatment)
	med.Get("/all", controllers.GetAllMedRecords)
	med.Get("/user/:id", controllers.GetHistoryOfPatient)

	app.Post("/user-login", controllers.UserLogin)
	app.Post("/doc-login", controllers.DocLogin)

}
