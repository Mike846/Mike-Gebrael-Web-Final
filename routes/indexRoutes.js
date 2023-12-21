const express = require('express');
const indexController = require('../controllers/indexController');

const router = express.Router();

// GET route for home page
router.get('/', indexController.getHomePage);

// GET route for searching comics
router.get('/search', indexController.searchComics);

module.exports = router;
