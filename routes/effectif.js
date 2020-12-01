const express = require("express"),
  router = express.Router();
const db = require("../db");

const getAll = `SELECT lo.idLouer, lo.nbJour, lo.date, 
  lc.idLocataire, lc.nom, lc.adresse, 
  v.idVoiture, v.designation, v.loyer
  FROM locataire lc
  INNER JOIN louer lo ON lo.locataire_id = lc.idLocataire
  INNER JOIN voiture v ON lo.voiture_id = v.idVoiture`;

router.get("/locataire-voiture/:id", (req, res) => {
  let sql = getAll + ` WHERE idVoiture = ? AND date BETWEEN ? and ?`;
  let values = [req.params.id, req.body.dateDebut, req.body.dateFin];
  db.query(sql, values, (err, data) => {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "locataire voiture successfully",
    });
  });
});

router.get("/voiture", (req, res) => {
  let sql = `SELECT v.designation, COUNT(*) AS effectif, SUM(lo.nbjour) AS totalJour, v.loyer 
  FROM locataire lc
  INNER JOIN louer lo ON lo.locataire_id = lc.idLocataire
  INNER JOIN voiture v ON lo.voiture_id = v.idVoiture
  AND date BETWEEN ? and ?
  GROUP BY idVoiture`;
  let values = [req.body.dateDebut, req.body.dateFin];
  db.query(sql, values, (err, data) => {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "effectif voiture succesfully",
    });
  });
});

module.exports = router;
