package handler

import (
	"net/http"

	"github.com/labstack/echo"
)

func Users() echo.HandlerFunc {
	return func(c echo.Context) error {
		return c.JSON(http.StatusOK, allUsers)
	}
}
