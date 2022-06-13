import jwt from 'jsonwebtoken';

const validateAuth = (permissionName = undefined) => (req, res, next) => {
  const bypassAcl = process.env.BYPASS_ACL || 0;

  if (bypassAcl) {
    return next();
  }

  let accessToken = req.body.access_token || req.query.access_token || req.headers['x-access-token'];

  if (!accessToken) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      [, accessToken] = [...req.headers.authorization.split(' ')];
    } else {
      return res.status(401).send('An Access Token is required for authentication');
    }
  }

  let decoded;
  try {
    decoded = jwt.verify(accessToken, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }

  if (permissionName !== undefined) {
    if (!decoded.permissions.includes(permissionName)) {
      return res.status(403).send('Forbidden! You are not authorized to access this resource.');
    }
  }

  return next();
};

export default validateAuth;
