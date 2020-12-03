const db = require("../../config/db");

const Locataire = function (locataire) {
  this.idLocataire = locataire.idLocataire;
  this.nom = locataire.nom;
  this.adresse = locataire.adresse;
};

Locataire.getAll = (result) => {
  db.query("SELECT * FROM locataire", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Locataire.create = (newLocataire, result) => {
  db.query("INSERT INTO locataire SET ?", newLocataire, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newLocataire });
  });
};

Locataire.findById = (id, result) => {
  db.query(`SELECT * FROM locataire WHERE idLocataire = ${id}`, (err, res) => {
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

Locataire.updateById = (id, locataire, result) => {
  db.query(
    "UPDATE locataire SET nom = ?, adresse = ? WHERE idLocataire = ?",
    [locataire.nom, locataire.adresse, id],
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

      result(null, { id: id, ...locataire });
    }
  );
};

Locataire.remove = (id, result) => {
  db.query("DELETE FROM locataire WHERE idLocataire = ?", id, (err, res) => {
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

module.exports = Locataire;
