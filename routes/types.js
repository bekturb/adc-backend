const express = require('express');
const router = express.Router();
const TypeController = require('../controllers/typeController')

router.get("/", TypeController.getAll)
router.post("/", TypeController.create)
router.get("/:id", TypeController.getOne)
router.put("/:id", TypeController.update)
router.delete("/:id", TypeController.delete)
module.exports = router;
