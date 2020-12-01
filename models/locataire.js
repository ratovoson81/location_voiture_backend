import db from "../db";

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
    console.log("locataire: ", res);
    result(null, res);
  });
};

Locataire.create = (newLocataire, result) => {
  console.log("new", newLocataire);
  db.query("INSERT INTO locataire SET ?", newLocataire, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created locataire: ", { id: res.insertId, ...newLocataire });
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
      console.log("found locataire: ", res[0]);
      result(null, res[0]);
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

      console.log("updated locataire: ", { id: id, ...locataire });
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

    console.log("deleted Locataire with id: ", id);
    result(null, res);
  });
};

module.exports = Locataire;
