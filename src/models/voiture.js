const db = require("../../config/db");

const Voiture = function (voiture) {
  this.idVoiture = voiture.idVoiture;
  this.designation = voiture.designation;
  this.loyer = voiture.loyer;
};

Voiture.getAll = (result) => {
  db.query("SELECT * FROM voiture", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Voiture.create = (newVoiture, result) => {
  db.query("INSERT INTO voiture SET ?", newVoiture, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newVoiture });
  });
};

Voiture.findById = (id, result) => {
  db.query(`SELECT * FROM voiture WHERE idVoiture = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Voiture.updateById = (id, voiture, result) => {
  db.query(
    "UPDATE voiture SET designation = ?, loyer = ? WHERE idVoiture = ?",
    [voiture.designation, voiture.loyer, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...voiture });
    }
  );
};

Voiture.remove = (id, result) => {
  db.query("DELETE FROM voiture WHERE idVoiture = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, id);
  });
};

Voiture.searchByDesignation = (nom, result) => {
  db.query(
    "SELECT * FROM voiture WHERE designation LIKE '%" + nom + "%'",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      result(null, res);
    }
  );
};

module.exports = Voiture;
