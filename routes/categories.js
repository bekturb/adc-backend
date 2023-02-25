const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/categoryController')
const auth = require("../middlewares/auth")
const admin = require("../middlewares/admin");

router.get("/", CategoryController.getAll)
router.post("/", [auth, admin], CategoryController.create)
router.get("/:id", CategoryController.getOne)
router.put("/:id", [auth, admin], CategoryController.update)
router.delete("/:id", [auth, admin], CategoryController.delete)
module.exports = router;
