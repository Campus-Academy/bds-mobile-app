const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

const multer = require("./multer-config");

// sans parametre
router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.put("/:id", multer, userController.updateUser);

// par id
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUserById);

// par mail
router.get("/mail/:mail", userController.getUserByMail);

// par nom ou prénom
router.get("/name/:name", userController.getUsersByName);

// connect par login et password
router.post("/login", userController.connectUser);

module.exports = router;
