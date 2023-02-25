const express = require('express');
const router = express.Router();
const ProjectInfoController = require('../controllers/projectInfoController')
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

router.get("/", ProjectInfoController.getAll)
router.post("/", [auth, admin], ProjectInfoController.create)
router.get("/:id", ProjectInfoController.getOne)
router.put("/:id", [auth, admin], ProjectInfoController.update)
router.delete("/:id", [auth, admin], ProjectInfoController.delete)
module.exports = router;