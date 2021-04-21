const jwtHandler = require('../utils/JWT');

/**
 * @description JWT token validation
 * @param req
 * @param res
 * @param next
 * @returns success and error any encountered
 */
exports.isAuth = (req, res, next) => {
  try {
    let authHeader = 'bearer' + ' ' + req.headers.authorization;
    console.log(authHeader, req.headers.authorization, 'authe');
    let decoded = jwtHandler.verifyJWT(res, authHeader);
    if (decoded) {
      req.user = decoded;
      next();
    }
  } catch (err) {
    next(err);
  }
};
