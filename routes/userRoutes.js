// userRoutes.js
const express = require('express');
const { validationResult } = require('express-validator');
const { insertUserValidation } = require('../validators/userValidator');
const userController = require('../controllers/userController');

const router = express.Router();

// POST route for registering new user
router.post('/register', insertUserValidation, async (req, res) => {
  try {
    validationResult(req).throw();
    await userController.registerUser(req, res);
  } catch (error) {
    res.status(400).json({ errors: error.array() });
  }
});

// POST route for login
router.post('/login', userController.loginUser);

// GET route for rendering login page
router.get('/login', userController.getLoginPage);

// GET route for rendering register page
router.get('/register', userController.getRegisterPage);

module.exports = router;
