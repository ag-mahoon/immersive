const { validationResult } = require("express-validator");
const createToken = require("../utils/createToken.js");
const dummyUser = require('../utils/user');

exports.login = (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        if (email === dummyUser.email && password === dummyUser.password) {
            dummyUser.token = createToken(dummyUser);
            return res.status(200).json(dummyUser);
        }

        return res.status(400).send({ error: "Invalid Credentials" });
    } catch (err) {
        return res.status(500).send({ error: "An unexpected error occurred" });
    }
};