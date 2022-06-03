import jwt from "jsonwebtoken";


const validateAuth = function (req, res, next) {    
    const access_token = req.body.access_token || req.query.access_token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
      } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    
    return next();
}

module.exports =  {
    validateAuth
};