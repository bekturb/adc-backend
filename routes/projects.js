const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/projectController')
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

router.get("/", ProjectController.getAll)
router.post("/", [auth, admin], ProjectController.create)
router.get("/:id", ProjectController.getOne)
router.put("/:id", [auth, admin], ProjectController.update)
router.delete("/:id", [auth, admin], ProjectController.delete)
module.exports = router;