import jwt from "jsonwebtoken";


const validateAuth = (permissionName = undefined) => {
    return (req, res, next) => {   

        return next();
        
        let access_token = req.body.access_token || req.query.access_token || req.headers["x-access-token"];

        if (!access_token) {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
            {
                access_token = req.headers.authorization.split(' ')[1];
            }
            else{
                return res.status(401).send("An Access Token is required for authentication");
            }
            
        }
        
        let decoded;
        try {
            decoded = jwt.verify(access_token, process.env.TOKEN_KEY);
            req.user = decoded;       
            
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }
        console.log(access_token)

        console.log(decoded)
        
        if(permissionName != undefined)         
        {
            if(!decoded.permissions.includes(permissionName))
            {
                return res.status(403).send("Forbidden! You are not authorized to access this resource.");
            }
        }            
        
        return next();
    }
}

module.exports =  {
    validateAuth
};