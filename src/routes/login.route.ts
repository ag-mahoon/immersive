const { body } = require("express-validator");

module.exports = (app) => {
    const loginController = require("../controllers/login.controller.ts");
    app.post(
        "/api/login",
        body("email", "Email is required").isEmail().normalizeEmail(),
        loginController.login
    );
}
