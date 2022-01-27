require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./routes/company.routes")(app);
require("./routes/employee.routes")(app);
require("./routes/login.route")(app);
require("./routes/welcome.route")(app);

module.exports = app