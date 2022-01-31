"use strict";
exports.__esModule = true;
var jwt = require("jsonwebtoken");
var verifyToken = function (req, res, next) {
    var token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ error: "A token is required for authentication" });
    }
    try {
        var decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
    }
    catch (err) {
        return res.status(401).send({ error: "Invalid Token" });
    }
    return next();
};
exports["default"] = verifyToken;
