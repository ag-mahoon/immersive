const authenticate = require("./authenticate.js");
const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
    const { role } = req.user
    if (role !== 'admin') {
        return res.status(403).send({ error: "Not authorize to perform this operation" });
    }

    return next();
};

module.exports = authorization;