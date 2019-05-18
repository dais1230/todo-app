package main

import (
	"fmt"
	"net/http"

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

func gormConnect() *gorm.DB {
	DBMS := "mysql"
	USER := "root"
	PROTOCOL := "tcp(127.0.0.1:3306)"
	DBNAME := "todoapp"

	CONNECT := USER + "@" + PROTOCOL + "/" + DBNAME + "?charset=utf8&parseTime=True&loc=Local"
	db, err := gorm.Open(DBMS, CONNECT)

	db.Set("gorm:table_options", "ENGINE=InnoDB").AutoMigrate(&User{}, &Task{})

	if err != nil {
		panic(err.Error())
	}
	return db
}

func main() {
	// instantiate echo
	e := echo.New()
	db := gormConnect()

	e.Use(middleware.CORS())
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	var allUsers []User
	db.Find(&allUsers)
	fmt.Println(allUsers)

	defer db.Close()

	// routing
	e.GET("/users", func(c echo.Context) error {
		return c.JSON(http.StatusOK, allUsers)
	})

	// launch server
	e.Start(":1313")
}
