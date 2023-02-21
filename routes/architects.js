const express = require('express');
const router = express.Router();
const ArchitectController = require('../controllers/architectController')

router.get("/", ArchitectController.getAll)
router.post("/", ArchitectController.create)
router.get("/:id", ArchitectController.getOne)
router.put("/:id", ArchitectController.update)
router.delete("/:id", ArchitectController.delete)
module.exports = router;
