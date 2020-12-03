const express = require("express");
const router = express.Router();

const voiture = require("../controllers/voiture");

router.get("/", voiture.findAll);
router.post("/", voiture.create);
router.get("/find/:id", voiture.findOne);
router.put("/:id", voiture.update);
router.delete("/:id", voiture.delete);
router.get("/search/:search", voiture.search);

module.exports = router;
