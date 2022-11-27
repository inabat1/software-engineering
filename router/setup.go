package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/inabatatkanova/Software-engineering/controllers"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")

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
	app.Post("/logout-admin", controllers.AdminLogout)
}
