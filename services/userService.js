const db = require('../database/db');
const bcrypt = require('bcrypt');

// Registers a new user in the database
const register = async (username, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    const values = [username, email, hashedPassword];
    await db.query(sql, values);
  } catch (error) {
    console.error('Error registering user:', error.message);
    throw error;
  }
};

// Logs in an existing user
const login = async (email, password) => {
  try {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const result = await db.query(sql, [email]);

    const userArray = result[0];

    if (!userArray || userArray.length === 0) {
      return null;
    }

    const user = userArray[0];

    if (!user || !user.password) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return { id: user.id, username: user.username, email: user.email };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error logging in user:', error.message);
    throw error;
  }
};

module.exports = {
  register,
  login,
};
