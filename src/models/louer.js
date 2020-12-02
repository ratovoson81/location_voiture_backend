const db = require("../../config/db");

const getAll = `SELECT lo.idLouer, lo.nbJour, lo.date, 
  lc.idLocataire, lc.nom, lc.adresse, 
  v.idVoiture, v.designation, v.loyer
  FROM locataire lc
  INNER JOIN louer lo ON lo.locataire_id = lc.idLocataire
  INNER JOIN voiture v ON lo.voiture_id = v.idVoiture`;

const Louer = function (louer) {
  this.idLouer = louer.idLouer;
  this.nbJour = louer.nbJour;
  this.date = louer.date;
  this.idLocataire = louer.idLocataire;
  this.nom = louer.nom;
  this.adresse = louer.adresse;
  this.idVoiture = louer.idVoiture;
  this.designation = louer.designation;
  this.loyer = louer.loyer;
};

Louer.getAll = (result) => {
  db.query(getAll, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Louer.create = (newLouer, result) => {
  db.query(
    "INSERT INTO louer(locataire_id, voiture_id, nbJour, date ) VALUES (?)",
    [newLouer],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      result(null, { id: res.insertId, ...newLouer });
    }
  );
};

Louer.findById = (id, result) => {
  db.query(getAll + ` WHERE idLouer = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Louer.updateById = (id, louer, result) => {
  db.query(
    "UPDATE louer SET locataire_id = ?, voiture_id = ?, nbJour = ?, date = ? WHERE idLouer = ?",
    [louer.locataire_id, louer.voiture_id, louer.nbJour, louer.date, id],
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

      result(null, { id: id, ...louer });
    }
  );
};

Louer.remove = (id, result) => {
  db.query("DELETE FROM louer WHERE idLouer = ?", id, (err, res) => {
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

Louer.effLocataireVoiture = (data, result) => {
  db.query(
    getAll + ` WHERE idVoiture = ? AND date BETWEEN ? and ?`,
    data,
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

module.exports = Louer;
