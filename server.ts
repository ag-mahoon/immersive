require("dotenv").config();
import db  from './models';
import app from './src/app';

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

db.sequelize
  .authenticate()
  .then(() => {
    console.log("database is connected.");
  })
  .catch((err) => {
    console.log(`Unable to connect to database, ${err}`);
  });

db.sequelize.sync();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
