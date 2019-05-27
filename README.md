# todo-app

## Description
This is a todo-app created by using Golang(backend) & React(frontend).

## Stack
- Golang
- Echo
- GORM
- React
- Mysql
- JWT

## Repository
```
client/
└── src/
    ├── components/
    ├── helpers/
    ├── services/
    └── App.js
  
server/
└── src/
    ├── handler/
    ├── model/
    └── main.go
```
### components
All components for showing pages are here
### helpers
For returning authorization header with jwt token when the user sends HTTP requests & error handling for bad request.
### services
For authentication functions like login & logout. it stores jwt token to local storage and removes from it when logout.
### handler
Mainly for returning json response of HTTP requests to client.
### model
For sending requests to DB


## Installation
```
git clone https://github.com/daisuke13/todo-app.git
cd server/src/
dep ensure # I used dep as a package manager
cd ../../client/src/
npm i
```
Server
```
cd server/src/
go run main.go
```
client
```
cd client/src/
npm run dev
```
