const express = require('express');
const router = express.Router();
const TypeController = require('../controllers/typeController')
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

router.get("/", TypeController.getAll)
router.post("/", [auth, admin], TypeController.create)
router.get("/:id", TypeController.getOne)
router.put("/:id", [auth, admin], TypeController.update)
router.delete("/:id", [auth, admin], TypeController.delete)
module.exports = router;
