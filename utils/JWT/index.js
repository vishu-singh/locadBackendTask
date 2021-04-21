const jwt = require('jsonwebtoken');
const secret = require('../../config/secret');
exports.getJWT = (email, name, id) => {
  try {
    const genratedToken = jwt.sign(
      {
        email,
        id,
      },
      secret.secret,
      { expiresIn: '1d' },
    );
    // console.log(genratedToken, 'genrated');
    return genratedToken;
  } catch (err) {
    throw err;
  }
};
exports.verifyJWT = (res, authHeader) => {
  try {
    if (!authHeader) {
      res.status(401).send({ status: 401, message: 'Not Authenticated' });
    } else {
      let token = authHeader.split(' ')[1];
      let decodedToken = jwt.verify(token, secret.secret);
      if (!decodedToken) {
        res.status(422).send({
          status: 422,
          message: 'token verification failed or token expired',
        });
      } else {
        return decodedToken;
      }
    }
  } catch (err) {
    throw err;
  }
};
