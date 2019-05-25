package handler

import (
	"net/http"

	"github.com/jinzhu/gorm"
	"github.com/labstack/echo"
	"github.com/todo-app/server/src/model"
)

func GetTasks(c echo.Context) error {
	uid := userIDFromToken(c)

	if user := model.FindUser(&model.User{Model: gorm.Model{ID: uid}}); user.ID == 0 {
		return echo.ErrNotFound
	}

	tasks := model.FindTasks(&model.Task{UserRefer: uid})
	return c.JSON(http.StatusOK, tasks)
}
