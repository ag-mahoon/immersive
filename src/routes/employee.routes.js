const { body, param } = require('express-validator');
const authorization = require('../middleware/authorization.js');
const authenticate = require('../middleware/authenticate.js');

module.exports = (app) => {
  const employeeController = require("../controllers/employee.controller.js");

  var router = require("express").Router();

  app.post("/api/employees/:companyId",
    param("companyId", "Can not create employee without company").not().isEmpty(),
    body("firstName", "Employee first name is required.").not().isEmpty(),
    body("lastName", "Employee last name is required.").not().isEmpty(),
    authenticate,
    authorization,
    employeeController.create
  );
  app.get("/api/employees/:companyId", authenticate, authorization, employeeController.findAll);
  app.get("/api/employees/:id", authenticate, authorization, employeeController.findOne);
  app.put("/api/employees/:id", authenticate, authorization, employeeController.update);
  app.delete("/api/employees/:id", authenticate, authorization, employeeController.delete);

  /* 
  Swagger didn't like this approach

  var router = require("express").Router();

  router.post("/:companyId",
    param("companyId", "Can not create employee without company").not().isEmpty(),
    body("firstName", "Employee first name is required.").not().isEmpty(),
    body("lastName", "Employee last name is required.").not().isEmpty(),
    employeeController.create
  );
  router.get("/:companyId", employeeController.findAll);
  router.get("/:id", employeeController.findOne);
  router.put("/:id", employeeController.update);
  router.delete("/:id", employeeController.delete);

  app.use("/api/employees", authenticate, authorization, router);*/
};
