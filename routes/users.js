const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController')
const auth = require("../middlewares/auth")

router.get("/", auth, UserController.getAll)
router.post("/", UserController.create)
router.get("/me", auth, UserController.getMe)
module.exports = router;