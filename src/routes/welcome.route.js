var authenticate = require('../middleware/authenticate.js');
module.exports = function (app) {
    app.get("/api/welcome", authenticate, function (req, res) {
        res.json({ message: "Welcome" });
    });
};
