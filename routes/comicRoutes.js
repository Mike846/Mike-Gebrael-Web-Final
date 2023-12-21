const express = require('express');
const comicController = require('../controllers/comicController');
const { storage, fileFilter } = require('../middleware/uploadMiddleware');
const multer = require('multer');

// Multer middleware for handling file uploads
const upload = multer({ storage, fileFilter });

// Express Router for comic-related routes
const router = express.Router();

// GET routes
router.get('/', comicController.getComics);
router.get('/author/:authorId', comicController.getComicsByAuthor);
router.get('/genre/:genreId', comicController.getComicsByGenre);
router.get('/date/:comicDate', comicController.getComicsByDate);
router.get('/comicdetails/:comicId', comicController.getComicById);
router.get('/comicdetails/:filePath', comicController.downloadComic);
router.get('/upload', comicController.getUploadPage);
router.get('/updatecomic/:comicId', comicController.getUpdatePage);

// POST route for uploading comics
router.post('/upload', upload.single('comicFile'), comicController.uploadComic);

// GET route for downloading comics
router.get('/comicdetails/:comicId/download', comicController.downloadComic);

// POST route for updating comics
router.post('/updatecomic/:comicId', comicController.updateComic);

// POST route for deleting comics
router.post('/deletecomic/:comicId', comicController.deleteComic);

module.exports = router;
