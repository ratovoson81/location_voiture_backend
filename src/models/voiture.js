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
    console.log("voiture: ", res);
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

    console.log("created voiture: ", { id: res.insertId, ...newVoiture });
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
      console.log("found voiture: ", res[0]);
      result(null, res[0]);
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

      console.log("updated voiture: ", { id: id, ...voiture });
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

    console.log("deleted voiture with id: ", id);
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
      console.log("voiture: ", res);
      result(null, res);
    }
  );
};

module.exports = Voiture;
