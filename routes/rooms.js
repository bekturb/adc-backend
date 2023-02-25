const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/roomController')
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

router.get("/", RoomController.getAll)
router.post("/", [auth, admin], RoomController.create)
router.get("/:id", RoomController.getOne)
router.put("/:id", [auth, admin], RoomController.update)
router.delete("/:id", [auth, admin], RoomController.delete)
module.exports = router;
