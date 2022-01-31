const authenticate = require('../middleware/authenticate.js');

module.exports = (app) => {
    app.get("/api/welcome", authenticate, (req, res) => {
        res.json({ message: "Welcome" });
    });
}