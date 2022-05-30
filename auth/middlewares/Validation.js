const { validationResult } = require('express-validator');

const validateRequest = function (req, res, next) {    

    var err = validationResult(req)        

    if (err.errors.length > 0) {
        console.log('Validation Errors',req.body)
        return res.status(400).send(err);
    }   

    next()
}

module.exports =  {
    validateRequest
};