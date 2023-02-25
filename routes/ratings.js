const express = require('express');
const router = express.Router();
const RatingController = require('../controllers/ratingController');
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");


router.get("/", RatingController.getAll)
router.post("/", [auth, admin], RatingController.create)
router.get("/:id", RatingController.getOne)
router.put("/:id", [auth, admin], RatingController.update)
router.delete("/:id", [auth, admin], RatingController.delete)
module.exports = router;
