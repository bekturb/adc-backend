const express = require('express');
const router = express.Router();
const UserController = require('../controllers/typeController')

router.get("/", UserController.getAll)
router.post("/", UserController.create)
router.get("/:id", UserController.getOne)
router.put("/:id", UserController.update)
router.delete("/:id", UserController.delete)
module.exports = router;