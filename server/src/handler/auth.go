package handler

import (
	"net/http"

	"github.com/labstack/echo"
	"github.com/todo-app/server/src/model"
)

func Signup() echo.HandlerFunc {
	return func(c echo.Context) error {
		user := new(model.User)

		if err := c.Bind(user); err != nil {
			return err
		}

		if user.Name == "" || user.Password == "" {
			return &echo.HTTPError{
				Code:    http.StatusBadRequest,
				Message: "invalid name or password",
			}
		}

		if u := model.FindUser(&model.User{Name: user.Name}); u.ID != 0 {
			return &echo.HTTPError{
				Code:    http.StatusConflict,
				Message: "name already exists",
			}
		}

		model.CreateUser(user)
		user.Password = ""

		return c.JSON(http.StatusCreated, user)
	}
}
