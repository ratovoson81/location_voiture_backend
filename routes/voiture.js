const express = require("express"),
  router = express.Router();

const db = require("../db");

router.get("/", function (req, res) {
  let sql = `SELECT * FROM voiture`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "voiture lists retrieved successfully",
    });
  });
});

router.post("/", function (req, res) {
  let sql = `INSERT INTO voiture(designation, loyer) VALUES (?)`;
  let values = [req.body.designation, req.body.loyer];
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "New voiture added successfully",
    });
  });
});

router.get("/:id", function (req, res) {
  let sql = `SELECT * FROM voiture WHERE idVoiture = ?`;
  let values = [req.params.id];
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "Select voiture by id successfully",
    });
  });
});

router.put("/:id", (req, res) => {
  let sql = `UPDATE voiture SET designation = ?, loyer = ? WHERE idVoiture = ?`;
  let values = [req.body.designation, req.body.loyer, req.params.id];
  db.query(sql, values, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "Update voiture successfully",
    });
  });
});

router.delete("/:id", (req, res) => {
  let sql = "DELETE FROM voiture WHERE idVoiture = " + req.params.id;
  db.query(sql, (err, data) => {
    if (err) throw err;
    res.send(
      JSON.stringify({
        status: 200,
        data,
        message: "Delete voiture successfully",
      })
    );
  });
});

router.get("/search/:nom", (req, res) => {
  let sql =
    "SELECT * FROM voiture WHERE designation LIKE '%" + req.params.nom + "%'";
  db.query(sql, (err, data, fields) => {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "Search voiture successfully",
    });
  });
});

module.exports = router;
