import db from "../db";

const Effectif = function (effectif) {
  this.designation = effectif.designation;
  this.effectif = effectif.effectif;
  this.totalJour = effectif.totalJour;
  this.loyer = effectif.loyer;
};

Effectif.getEffectif = (data, result) => {
  db.query(
    `SELECT v.designation, COUNT(*) AS effectif, SUM(lo.nbjour) AS totalJour, v.loyer 
    FROM locataire lc
    INNER JOIN louer lo ON lo.locataire_id = lc.idLocataire
    INNER JOIN voiture v ON lo.voiture_id = v.idVoiture
    AND date BETWEEN ? and ?
    GROUP BY idVoiture`,
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

module.exports = Effectif;
