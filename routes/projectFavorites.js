const express = require('express');
const router = express.Router();
const ProjectFavoriteController = require('../controllers/projectFavoriteController')
const auth = require("../middlewares/auth");

router.get("/", auth, ProjectFavoriteController.getAll)
router.post("/", auth, ProjectFavoriteController.create)
router.delete("/:id", auth, ProjectFavoriteController.delete)
module.exports = router;