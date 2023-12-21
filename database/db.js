const mysql = require('mysql2/promise');
const config = require('./config');

// A pool of MySQL database connections
const pool = mysql.createPool(config);

module.exports = pool;
