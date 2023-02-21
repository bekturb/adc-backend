const express = require('express');
const router = express.Router();
const RatingController = require('../controllers/ratingController')

router.get("/", RatingController.getAll)
router.post("/", RatingController.create)
router.get("/:id", RatingController.getOne)
router.put("/:id", RatingController.update)
router.delete("/:id", RatingController.delete)
module.exports = router;
