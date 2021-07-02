const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        // "barear mcnsiwmcbiwueknsckjsdmcnksj"
        // "barear token"
        jwt.verify(token, "secret_this_should_be_longer");
        next();
    } catch (error) {
        return res.status(401).json({message:"Authentication Failed", error1:error});
    }
}