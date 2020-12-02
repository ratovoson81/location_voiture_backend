const express = require("express");
const router = express.Router();

const effectif = require("../controllers/effectif");

router.get("/voiture", effectif.getEffectif);

module.exports = router;
