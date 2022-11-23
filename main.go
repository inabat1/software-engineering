package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/soolllv/densys_milestone2/database"
	"github.com/soolllv/densys_milestone2/router"
)

func CreateServer() *fiber.App {
	app := fiber.New()

	return app
}

func main() {

	// connect to PSQL
	database.ConnectToDB()

	app := CreateServer()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000",
		AllowHeaders:     "Origin, Content-Type, Accept",
		AllowCredentials: true,
	}))

	router.SetupRoutes(app)

	//404 handler
	app.Use(func(c *fiber.Ctx) error {
		return c.SendStatus(404)
	})

	log.Fatal(app.Listen(":8000"))
}
