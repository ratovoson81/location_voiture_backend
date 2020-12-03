const express = require("express");
const router = express.Router();

const louer = require("../controllers/louer");

router.get("/", louer.findAll);
router.post("/", louer.create);
router.get("/:id", louer.findOne);
router.put("/:id", louer.update);
router.delete("/:id", louer.delete);
router.get(
  "/locataire-voiture/:id/:dateDebut:/dateFin",
  louer.effLocataireVoiture
);

module.exports = router;
