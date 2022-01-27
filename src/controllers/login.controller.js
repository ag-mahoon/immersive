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

        return res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
        return res.status(500).send("An unexpected error occurred");
    }
};