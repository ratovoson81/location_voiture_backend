const Louer = require("../models/louer");

exports.findAll = (req, res) => {
  Louer.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Louer.",
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

  Louer.create(req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Louer.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Louer.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found louer with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving louer with id " + req.params.id,
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

  Louer.updateById(req.params.id, req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found louer with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating louer with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Louer.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found louer with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete louer with id " + req.params.id,
        });
      }
    } else
      res.send({
        message: `louer was deleted successfully!`,
        idDelected: data,
      });
  });
};

exports.effLocataireVoiture = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut pas etre vide!",
    });
  }

  const data = [req.params.id, req.body.dateDebut, req.body.dateFin];

  Louer.effLocataireVoiture(data, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Louer.",
      });
    else res.send(data);
  });
};
