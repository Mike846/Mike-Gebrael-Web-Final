const { check } = require('express-validator');

// Array of Express Validator checks for validating user insertion data
const insertUserValidation = [
  check('username').notEmpty().withMessage('User Name is required'),
  check('email').isEmail().withMessage('Invalid Email Format'),
  check('password').notEmpty().withMessage('User Password is required'),
];

// Array of Express Validator checks for validating user update data
const updateUserValidation = [
  check('username').notEmpty().withMessage('User Name is required'),
  check('email').isEmail().withMessage('Invalid Email Format'),
  check('password').notEmpty().withMessage('User Password is required'),
];

module.exports = {
  insertUserValidation,
  updateUserValidation,
};
