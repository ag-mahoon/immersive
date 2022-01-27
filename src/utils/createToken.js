const jwt = require('jsonwebtoken');

const createToken = (user) => {
    const token = jwt.sign({ user_id: user._id, email: user.email, role: user.role }, process.env.TOKEN_KEY, { expiresIn: "2h" });
    return token;
}

module.exports = createToken;