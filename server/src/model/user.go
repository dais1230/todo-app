package model

type User struct {
	ID       int    `json:"id" gorm:"praimary_key"`
	Name     string `json:"name" sql:"not null"`
	Password string `json:"password" sql:"not null"`
	Task     []Task
}
