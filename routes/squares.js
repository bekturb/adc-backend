const express = require('express');
const router = express.Router();
const SquareController = require('../controllers/squareController');
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

router.get("/", SquareController.getAll)
router.post("/", [auth, admin], SquareController.create)
router.get("/:id", SquareController.getOne)
router.put("/:id", [auth, admin], SquareController.update)
router.delete("/:id", [auth, admin], SquareController.delete)
module.exports = router;