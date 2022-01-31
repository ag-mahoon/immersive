require("dotenv").config();
import express from 'express';
import { json, urlencoded } from 'body-parser';

const app = express();

app.use(json())
app.use(urlencoded({ extended: true }));
require("./routes/company.routes")(app);
require("./routes/employee.routes")(app);
require("./routes/login.route")(app);
require("./routes/welcome.route")(app);

export default app;