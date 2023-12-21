const comicService = require('../services/comicService');
const path = require('path');
const fs = require('fs').promises;

// Get all Comics
const getComics = async (req, res) => {
  try {
    const comics = await comicService.getComics();
    res.json(comics);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Get a specific comic using it's ID
const getComicById = async (req, res) => {
  const { comicId } = req.params;

  try {
    await comicService.incrementVisits(comicId);

    const comic = await comicService.getComicById(comicId);
    if (comic) {
      const authorName = await comicService.getAuthorNameById(comic.authorID);
      const genreName = await comicService.getGenreNameById(comic.genreID);

      res.render('comicDetails', { comic, authorName, genreName });
    } else {
      res.status(404).send('Comic not found');
    }
  } catch (error) {
    console.error('Error handling comic request:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

// Get all comics made by the same author
const getComicsByAuthor = async (req, res) => {
  const { authorId } = req.params;
  try {
    const comics = await comicService.getComicsByAuthor(authorId);
    res.json(comics);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Get all comics in the same genre
const getComicsByGenre = async (req, res) => {
  const { genreId } = req.params;
  try {
    const comics = await comicService.getComicsByGenre(genreId);
    res.json(comics);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Get all comics published on a specific date
const getComicsByDate = async (req, res) => {
  const { comicDate } = req.params;
  try {
    const comics = await comicService.getComicsByDate(comicDate);
    res.json(comics);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Renders the upload page
const getUploadPage = async(req, res) => {
  res.render('uploadComic');
};

// Render the update page
const getUpdatePage = async (req, res) => {
  const { comicId } = req.params;
  try {
    const comic = await comicService.getComicById(comicId);
    const authorName = await comicService.getAuthorNameById(comic.authorID);
    const genreName = await comicService.getGenreNameById(comic.genreID);

    // Pass both the comic and the additional information to the view
    res.render('updateComic', { comic, authorName, genreName });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Uploads a comic
const uploadComic = async (req, res) => {
  try {
    const { title, author_name, genre_name, publication_date, description } = req.body;
    const filePath = req.file.path;

    const { comicID } = await comicService.uploadComic(
      title,
      author_name,
      genre_name,
      publication_date,
      description,
      filePath
    );

    const newComicID = await comicService.getComicIdByTitle(title);

    res.render('uploadSuccess', { comicID: newComicID });
  } catch (error) {
    console.error('Error uploading comic:', error);
    res.status(400).render('uploadFailed');
  }
};

// Updates the info of a comic
const updateComic = async (req, res) => {
  const { comicId } = req.params;
  const updatedDetails = req.body;

  try {
    const { title, author_name, genre_name, publication_date, description } = updatedDetails;

    await comicService.updateComic(comicId, {
      title,
      author_name,
      genre_name,
      publication_date,
      description,
    });

    res.render('updateComicSuccess', { comicId });
  } catch (error) {
    console.error(error);
    res.status(500).render('updateComicFail');
  }
};

// Deletes a comic
const deleteComic = async (req, res) => {
  const { comicId } = req.params;
  try {
    const comic = await comicService.getComicById(comicId);

    await fs.unlink(`./${comic.file_path}`);

    await comicService.deleteComic(comicId);

    res.render('deleteComicSuccess');
  } catch (error) {
    console.error(error);
    res.status(500).render('deleteComicFail');
  }
};

// Downloads a comic
const downloadComic = (req, res) => {
  try {
    const { filePath } = req.params;
    const fullPath = path.join(__dirname, '..', 'uploads', filePath);

    if (fs.existsSync(fullPath)) {
      res.download(fullPath);
    } else {
      res.status(404).send('File not found');
    }
  } catch (error) {
    console.error('Error downloading comic:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getComics,
  getComicById,
  getComicsByAuthor,
  getComicsByGenre,
  getComicsByDate,
  getUploadPage,
  getUpdatePage,
  uploadComic,
  updateComic,
  deleteComic,
  downloadComic,
};
