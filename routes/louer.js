const express = require("express"),
  router = express.Router();

const db = require("../db");

const getAllLouer = `SELECT lo.idLouer, lo.nbJour, lo.date, 
  lc.idLocataire, lc.nom, lc.adresse, 
  v.idVoiture, v.designation, v.loyer
  FROM locataire lc
  INNER JOIN louer lo ON lo.locataire_id = lc.idLocataire
  INNER JOIN voiture v ON lo.voiture_id = v.idVoiture`;

router.get("/", function (req, res) {
  let sql = getAllLouer;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "louer lists retrieved successfully",
    });
  });
});

router.post("/", function (req, res) {
  let sql = `INSERT INTO louer(locataire_id, voiture_id, nbJour, date ) VALUES (?)`;
  let values = [
    req.body.locataire_id,
    req.body.voiture_id,
    req.body.nbJour,
    req.body.date,
  ];
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "New louer added successfully",
    });
  });
});

router.get("/:id", function (req, res) {
  let sql = getAllLouer + ` WHERE idLouer = ?`;
  db.query(sql, req.params.id, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "Select louer by id successfully",
    });
  });
});

router.put("/:id", (req, res) => {
  let sql = `UPDATE louer SET locataire_id = ?, voiture_id = ?, nbJour = ?, date = ? WHERE idLouer = ?`;
  let values = [
    req.body.locataire_id,
    req.body.voiture_id,
    req.body.nbJour,
    req.body.date,
    req.params.id,
  ];
  db.query(sql, values, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "Update louer successfully",
    });
  });
});

router.delete("/:id", (req, res) => {
  let sql = "DELETE FROM louer WHERE idLouer = " + req.params.id;
  db.query(sql, (err, data) => {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "Delete louer successfully",
    });
  });
});

module.exports = router;
