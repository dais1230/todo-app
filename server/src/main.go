package main

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/todo-app/server/src/handler"
)

func main() {
	// instantiate echo
	e := echo.New()

	e.Use(middleware.CORS())
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// routing
	e.POST("/signup", handler.Signup)
	e.POST("/login", handler.Login)

	api := e.Group("/api")
	api.Use(middleware.JWTWithConfig(handler.Config))
	api.GET("/tasks", handler.GetTasks)
	api.POST("/tasks", handler.AddTask)
	api.PUT("/tasks/:id/completed", handler.UpdateTask)

	// launch server
	e.Start(":1313")
}
