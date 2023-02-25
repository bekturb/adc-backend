const express = require('express');
const router = express.Router();
const ProjectInfoController = require('../controllers/projectInfoController')

router.get("/", ProjectInfoController.getAll)
router.post("/", ProjectInfoController.create)
router.get("/:id", ProjectInfoController.getOne)
router.put("/:id", ProjectInfoController.update)
router.delete("/:id", ProjectInfoController.delete)
module.exports = router;