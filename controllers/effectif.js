const Effectif = require("../models/effectif");

exports.getEffectif = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut pas etre vide!",
    });
  }
  let values = [req.body.dateDebut, req.body.dateFin];

  Effectif.getEffectif(values, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving effectif.",
      });
    else res.send(data);
  });
};
