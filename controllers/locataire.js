const Locataire = require("../models/locataire");

exports.findAll = (req, res) => {
  Locataire.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving locataire.",
      });
    else res.send(data);
  });
};

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut pas etre vide!",
    });
  }

  const locataire = new Locataire({
    nom: req.body.nom,
    adresse: req.body.adresse,
  });

  Locataire.create(locataire, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the locataire.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Locataire.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found locataire with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving locataire with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut pas etre vide!",
    });
  }

  Locataire.updateById(req.params.id, new Locataire(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Locataire with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Locataire with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Locataire.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Locataire with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Locataire with id " + req.params.id,
        });
      }
    } else
      res.send({
        message: `Locataire was deleted successfully!`,
        idDelected: data,
      });
  });
};
