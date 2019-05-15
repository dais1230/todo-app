package main

import (
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

// Association
type User struct {
	gorm.Model
	Name  string `gorm:"size:255"`
	Email string
	Task  []Task
}

type Task struct {
	gorm.Model
	UserID      int    `gorm:"index"`
	Name        string `gorm:"size:255"`
	Description string `gorm:"type:text"`
}

func main() {
	initMigrate()
	run()
}

func initMigrate() {
	db, err := gorm.Open("mysql", "root@/todoapp?charset=utf8&parseTime=True&loc=Local")
	defer db.Close()
	if err != nil {
		panic(err)
	}
	db.Set("gorm:table_options", "ENGINE=InnoDB").AutoMigrate(&User{}, &Task{})
}

func run() {
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// e.GET("/users", showUsers)
	// e.GET("/user/:id", showUser)
	// e.POST("/user", newUser)
	// e.PUT("/user/:id", updateUser)
	// e.DELETE("/user/:id", deleteUser)

	fmt.Println("Run server with echo localhost:1313")
	log.Fatal(e.Start(":1313"))
}
