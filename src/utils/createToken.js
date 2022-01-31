"use strict";
exports.__esModule = true;
var jwt = require("jsonwebtoken");
var createToken = function (user) {
    var token = jwt.sign({
        user_id: user._id,
        email: user.email,
        role: user.role
    }, process.env.TOKEN_KEY, {
        expiresIn: "2h"
    });
    return token;
};
exports["default"] = createToken;
