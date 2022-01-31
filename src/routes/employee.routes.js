"use strict";
exports.__esModule = true;
var express_validator_1 = require("express-validator");
var authorization_1 = require("../middleware/authorization");
var authenticate_1 = require("../middleware/authenticate");
module.exports = function (app) {
    var employeeController = require("../controllers/employee.controller.ts");
    app.post("/api/employees/:companyId", (0, express_validator_1.param)("companyId", "Can not create employee without company").not().isEmpty(), (0, express_validator_1.body)("firstName", "Employee first name is required.").not().isEmpty(), (0, express_validator_1.body)("lastName", "Employee last name is required.").not().isEmpty(), authenticate_1["default"], authorization_1["default"], employeeController.create);
    app.get("/api/employees/:companyId", authenticate_1["default"], authorization_1["default"], employeeController.findAll);
    app.get("/api/employees/:id", authenticate_1["default"], authorization_1["default"], employeeController.findOne);
    app.put("/api/employees/:id", authenticate_1["default"], authorization_1["default"], employeeController.update);
    app["delete"]("/api/employees/:id", authenticate_1["default"], authorization_1["default"], employeeController.deleteEmployee);
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
