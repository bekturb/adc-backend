const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/projectController')

router.get("/", ProjectController.getAll)
router.post("/", ProjectController.create)
router.get("/:id", ProjectController.getOne)
router.put("/:id", ProjectController.update)
router.delete("/:id", ProjectController.delete)
module.exports = router;