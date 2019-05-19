package model

type Task struct {
	UserID      int    `json:"id" sql:"not null"`
	ID          int    `json:"id" gorm:"praimary_key"`
	Description string `json:"description" sql:"not null"`
	Completed   bool   `json:"completed" sql:"not null"`
}
