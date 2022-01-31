var body = require("express-validator").body;
module.exports = function (app) {
    var loginController = require("../controllers/login.controller.ts");
    app.post("/api/login", body("email", "Email is required").isEmail().normalizeEmail(), loginController.login);
};
