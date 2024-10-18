const express = require("express");
const router = express.Router();

const UserController = require("./UserController");
const UserService = require("../../application/user/UserService");
const SQLiteUserRepository = require("../../infrastructure/repositories/SQLiteUserRepository");

const userRepository = new SQLiteUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userController.configureRoutes(router);

module.exports = router;
