require("./config/db");
const express = require("express"),
  cors = require("cors"),
  bodyParser = require("body-parser");

const locataireRouter = require("./src/routes/locataire");
const voitureRouter = require("./src/routes/voiture");
const louerRouter = require("./src/routes/louer");
const effectifRouter = require("./src/routes/effectif");

(app = express()),
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type,Accept"
    );
    next();
  });

app.use(cors());
app.use(bodyParser.json());
app.use("/locataire", locataireRouter);
app.use("/voiture", voitureRouter);
app.use("/louer", louerRouter);
app.use("/effectif", effectifRouter);

app.listen(4000, () => console.log(`Server started at http://localhost:4000`));
