package model

import (
	"fmt"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

type User struct {
	gorm.Model
	Name     string `sql:"not null"`
	Password string `sql:"not null"`
	Tasks    []Task `gorm:"foreignkey:UserRefer"`
}

type Task struct {
	gorm.Model
	Description string `sql:"not null"`
	Completed   bool   `sql:"not null"`
	UserRefer   uint   `sql:"not null"`
}

type Tasks []Task

var db *gorm.DB

func init() {
	DBMS := "mysql"
	USER := "root"
	PROTOCOL := "tcp(127.0.0.1:3306)"
	DBNAME := "todoapp"

	CONNECT := USER + "@" + PROTOCOL + "/" + DBNAME + "?charset=utf8&parseTime=True&loc=Local"
	var err error
	db, err = gorm.Open(DBMS, CONNECT)

	if err != nil {
		panic(err.Error())
	}

	db.AutoMigrate(User{})
	db.AutoMigrate(Task{})
}

func CreateUser(user *User) {
	db.Create(user)
}

func FindUser(u *User) User {
	var user User
	db.Where(u).First(&user)
	return user
}

func FindTasks(t *Task) Tasks {
	var tasks Tasks
	db.Where(t).Find(&tasks)
	return tasks
}

func UpdateTask(t *Task) error {
	rows := db.Model(t).Update(map[string]interface{}{
		"completed": t.Completed,
	}).RowsAffected
	if rows == 0 {
		return fmt.Errorf("Could not find Task (%v) to update", t)
	}
	return nil
}
