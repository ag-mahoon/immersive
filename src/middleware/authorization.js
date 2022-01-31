"use strict";
exports.__esModule = true;
var authorization = function (req, res, next) {
    var role = req.user.role;
    if (role !== 'admin') {
        return res.status(403).send({ error: "Not authorize to perform this operation" });
    }
    return next();
};
exports["default"] = authorization;
