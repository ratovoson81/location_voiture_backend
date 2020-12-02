const express = require("express");
const router = express.Router();

const voiture = require("../controllers/voiture");

router.get("/", voiture.findAll);
router.post("/", voiture.create);
router.get("/:id", voiture.findOne);
router.put("/:id", voiture.update);
router.delete("/:id", voiture.delete);
router.get("/search/:nom", voiture.search);

module.exports = router;
