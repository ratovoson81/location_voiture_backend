const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "location_voiture",
});

db.connect((err) => {
  if (!err) console.log("Connection ok");
  else console.log("Connection failed");
});

module.exports = db;
