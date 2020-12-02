const express = require("express");
const router = express.Router();

const locataire = require("../controllers/locataire");

router.get("/", locataire.findAll);
router.post("/", locataire.create);
router.get("/:id", locataire.findOne);
router.put("/:id", locataire.update);
router.delete("/:id", locataire.delete);

module.exports = router;
