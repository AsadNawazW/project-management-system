import { validationResult } from 'express-validator';

const validateRequest = (req, res, next) => {
  const err = validationResult(req);

  if (err.errors.length > 0) {
    // console.log('Validation Errors',req)
    return res.status(400).send(err);
  }

  return next();
};

export default validateRequest;
