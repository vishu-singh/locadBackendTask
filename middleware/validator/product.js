const { body } = require('express-validator');
(exports.productValidator = [
    body('name')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Product Name should not be empty'),
    body('price')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Price Should not be empty'),
  ])