const { body } = require('express-validator');
(exports.loginValidator = [
    body('userName')
      .trim()
      .not()
      .isEmpty()
      .withMessage('username should not be empty'),
    body('password')
      .trim()
      .not()
      .isEmpty()
      .withMessage('password should not be empty'),
  ])