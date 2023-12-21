// Load environment variables from a .env file
require('dotenv').config();

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const job = require('./scheduledJobs')

// Create an Express application
const app = express();
const port = process.env.PORT || 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use('/public', express.static('public'));

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import database module
const db = require('./database/db');

// Import and use routes
const indexRoutes = require('./routes/indexRoutes');
const comicsRoutes = require('./routes/comicRoutes');
const usersRoutes = require('./routes/userRoutes');

// Start the cron job
job.start();

// Set up routes
app.use('/', indexRoutes);
app.use('/comics', comicsRoutes);
app.use('/users', usersRoutes);

// Serve uploaded files in the 'uploads' directory
app.use('/comics/comicdetails/uploads', express.static('uploads'));

// Start the Express server on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});