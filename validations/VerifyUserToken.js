const JWT = require("jsonwebtoken");

module.exports = function(req, res, next) {
    const token = req.header("auth-token");
    if(!token) return res.status(400).send("Access-Denied");

    try {
        const verified = JWT.verify(token, process.env.USER_TOKEN);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send("Invalid User")
    }
};