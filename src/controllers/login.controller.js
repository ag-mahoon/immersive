"use strict";
exports.__esModule = true;
exports.login = void 0;
var express_validator_1 = require("express-validator");
var createToken_1 = require("../utils/createToken");
var user_1 = require("../utils/user");
var login = function (req, res) {
    try {
        var errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        var _a = req.body, email = _a.email, password = _a.password;
        if (email === user_1["default"].email && password === user_1["default"].password) {
            var token = (0, createToken_1["default"])(user_1["default"]);
            var dummyNewUser = user_1["default"];
            dummyNewUser.token = token;
            return res.status(200).json(user_1["default"]);
        }
        return res.status(400).send({ error: "Invalid Credentials" });
    }
    catch (err) {
        return res.status(500).send({ error: "An unexpected error occurred" });
    }
};
exports.login = login;
