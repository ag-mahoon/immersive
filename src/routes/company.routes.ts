import { body } from 'express-validator';
import authorization from '../middleware/authorization';
import authenticate from '../middleware/authenticate';

module.exports = (app) => {
  const companyController = require("../controllers/company.controller.ts");

  app.post("/api/companies", body("name", "Company name is required.").not().isEmpty(), authenticate, authorization, companyController.create);
  app.get("/api/companies", authenticate, authorization, companyController.findAll);
  app.get("/api/companies/:id", authenticate, authorization, companyController.findOne);
  app.put("/api/companies/:id", authenticate, authorization, companyController.update);
  app.delete("/api/companies/:id", authenticate, authorization, companyController.deleteCompany);

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
