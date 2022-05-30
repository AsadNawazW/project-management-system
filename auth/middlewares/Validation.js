const { validationResult } = require('express-validator');

const validateRequest = function (req, res, next) {    

    var err = validationResult(req)        

    if (err) {
        res.status(400).send(err);
    }   

    next()
}

module.exports =  {
    validateRequest
};