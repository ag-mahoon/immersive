"use strict";
exports.__esModule = true;
var express_validator_1 = require("express-validator");
var authorization_1 = require("../middleware/authorization");
var authenticate_1 = require("../middleware/authenticate");
module.exports = function (app) {
    var companyController = require("../controllers/company.controller.ts");
    app.post("/api/companies", (0, express_validator_1.body)("name", "Company name is required.").not().isEmpty(), authenticate_1["default"], authorization_1["default"], companyController.create);
    app.get("/api/companies", authenticate_1["default"], authorization_1["default"], companyController.findAll);
    app.get("/api/companies/:id", authenticate_1["default"], authorization_1["default"], companyController.findOne);
    app.put("/api/companies/:id", authenticate_1["default"], authorization_1["default"], companyController.update);
    app["delete"]("/api/companies/:id", authenticate_1["default"], authorization_1["default"], companyController.deleteCompany);
    /*
    Swagger is not generating api endpoints properly this way
    var router = require("express").Router();
  
    router.post("/", body("name", "Company name is required.").not().isEmpty(), companyController.create);
    router.get("/", companyController.findAll);
    router.get("/:id", companyController.findOne);
    router.put("/:id", companyController.update);
    router.delete("/:id", companyController.delete);
  
    app.use("/api/companies", authenticate, authorization, router);
    */
};
