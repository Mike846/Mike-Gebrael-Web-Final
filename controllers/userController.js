const userService = require('../services/userService');

// Renders the login page
const getLoginPage = async (req, res) => {
  res.render('login');
};

// Renders the register page
const getRegisterPage = async (req, res) => {
  res.render('register');
};

// Register a new user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await userService.register(username, email, password);
    res.status(201).render('registerSuccess', { username });
  } catch (error) {
    console.error(error);
    res.status(500).render('registerFail');
  }
};

// Authenticate a new User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.login(email, password);
    if (user) {
      res.render('loginSuccess', { username: user.username });
    } else {
      res.status(401).render('loginFail');
    }
  } catch (error) {
    console.error(error);
    res.status(500).render('loginFail');
  }
};

module.exports = {
  getLoginPage,
  getRegisterPage,
  registerUser,
  loginUser,
};
