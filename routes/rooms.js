const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/roomController')

router.get("/", RoomController.getAll)
router.post("/", RoomController.create)
router.get("/:id", RoomController.getOne)
router.put("/:id", RoomController.update)
router.delete("/:id", RoomController.delete)
module.exports = router;
