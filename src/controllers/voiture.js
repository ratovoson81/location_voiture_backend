const Voiture = require("../models/voiture");

exports.findAll = (req, res) => {
  Voiture.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Voiture.",
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

  const voiture = new Voiture({
    designation: req.body.designation,
    loyer: req.body.loyer,
  });

  Voiture.create(voiture, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Voiture.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  findById(req.params.id, res);
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut pas etre vide!",
    });
  }

  Voiture.updateById(req.params.id, new Voiture(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Voiture with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Voiture with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Voiture.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Voiture with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Voiture with id " + req.params.id,
        });
      }
    } else
      res.send({
        message: `Voiture was deleted successfully!`,
        idDelected: data,
      });
  });
};

exports.search = (req, res) => {
  const search = req.params.search;
  if (!search) {
    res.status(400).send({
      message: "Le contenu ne peut pas etre vide!",
    });
  }

  if (!parseInt(search)) {
    Voiture.searchByDesignation(search, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Voiture.",
        });
      else res.send(data);
    });
  } else {
    findById(search, res);
  }
};

function findById(id, res) {
  Voiture.findById(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Voiture with id ${id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Voiture with id " + id,
        });
      }
    } else res.send(data);
  });
}
