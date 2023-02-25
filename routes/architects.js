const express = require('express');
const router = express.Router();
const ArchitectController = require('../controllers/architectController')
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

router.get("/", ArchitectController.getAll)
router.post("/", [auth, admin], ArchitectController.create)
router.get("/:id", ArchitectController.getOne)
router.put("/:id",[auth, admin], ArchitectController.update)
router.delete("/:id", [auth, admin], ArchitectController.delete)
module.exports = router;
