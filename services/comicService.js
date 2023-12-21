const db = require('../database/db');

// Service that returns all comics in the database
const getComics = async () => {
  try {
    const [results] = await db.query('SELECT * FROM comics');
    return results;
  } catch (error) {
    console.error('Error getting comics:', error.message);
    throw error;
  }
};

// Service that returns a comic from the database using it's ID
const getComicById = async (comicId) => {
  try {
    const [results] = await db.query('SELECT * FROM comics WHERE comicID = ?', [comicId]);
    return results[0];
  } catch (error) {
    console.error('Error getting comic by ID:', error.message);
    throw error;
  }
};

// Service that returns a comic's ID using it's title
const getComicIdByTitle = async (title) => {
  try {
    const [result] = await db.query('SELECT * FROM comics WHERE title = ?', [title]);

    if (result.length > 0) {
      return result[0].comicID;
    } else {
      throw new Error('Comic not found');
    }
  } catch (error) {
    console.error('Error getting comic ID by title:', error.message);
    throw error;
  }
};

// Service that returns all comics written by the same author using the auhtor's ID
const getComicsByAuthor = async (authorId) => {
  try {
    const [results] = await db.query('SELECT * FROM comics WHERE authorID = ?', [authorId]);
    return results;
  } catch (error) {
    console.error('Error getting comics by author:', error.message);
    throw error;
  }
};

// Service that returns all comics in the same genre using the genre's ID
const getComicsByGenre = async (genreId) => {
  try {
    const [results] = await db.query('SELECT * FROM comics WHERE genreID = ?', [genreId]);
    return results;
  } catch (error) {
    console.error('Error getting comics by genre:', error.message);
    throw error;
  }
};

// Service that returns all comics published on a specific date
const getComicsByDate = async (comicDate) => {
  try {
    const results = await db.query('SELECT * FROM comics WHERE publication_date = ?', [comicDate]);
    return results;
  } catch (error) {
    console.error('Error getting comics by date:', error.message);
    throw error;
  }
};

// Service that returns an Author's ID if they're already in the database if not a new author is created
const getOrCreateAuthor = async (author_name) => {
  try {
    const [existingAuthor] = await db.query('SELECT * FROM authors WHERE author_name = ?', [author_name]);

    if (existingAuthor.length > 0) {
      return existingAuthor[0].authorID;
    } else {
      const result = await db.query('INSERT INTO authors (author_name) VALUES (?)', [author_name]);

      const [newAuthor] = await db.query('SELECT * FROM authors WHERE author_name = ?', [author_name]);
      return newAuthor[0].authorID;
    }
  } catch (error) {
    console.error('Error querying authors:', error.message);
    throw error;
  }
};

// Service that returns a genre's ID if they are already in the datbase if not a new genre is created
const getOrCreateGenre = async (genre_name) => {
  try {
    const [existingGenre] = await db.query('SELECT * FROM genres WHERE genre_name = ?', [genre_name]);

    if (existingGenre.length > 0) {
      return existingGenre[0].genreID;
    } else {
      const result = await db.query('INSERT INTO genres (genre_name) VALUES (?)', [genre_name]);
      
      const [newGenre] = await db.query('SELECT * FROM genres WHERE genre_name = ?', [genre_name]);
      return newGenre[0].genreID;
    }
  } catch (error) {
    console.error('Error querying genres:', error.message);
    throw error;
  }
};

// Service that returns an Author's name by their ID
const getAuthorNameById = async (authorID) => {
  try {
    const [result] = await db.query('SELECT author_name FROM authors WHERE authorID = ?', [authorID]);

    if (result.length > 0) {
      return result[0].author_name;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting author name by ID:', error.message);
    throw error;
  }
};

// Service that returns a genre's name by it's ID
const getGenreNameById = async (genreID) => {
  try {
    const [result] = await db.query('SELECT genre_name FROM genres WHERE genreID = ?', [genreID]);

    if (result.length > 0) {
      return result[0].genre_name;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting genre name by ID:', error.message);
    throw error;
  }
};

// Service that inserts the info a newly uploaded comic
const uploadComic = async (title, author_name, genre_name, publication_date, description, file_path) => {
  try {
    const authorID = await getOrCreateAuthor(author_name);
    const genreID = await getOrCreateGenre(genre_name);

    const result = await db.query(
      'INSERT INTO comics (title, authorID, genreID, publication_date, description, file_path) VALUES (?, ?, ?, ?, ?, ?)',
      [title, authorID, genreID, publication_date, description, file_path]
    );

    return { success: true, comicID: result.insertId };
  } catch (error) {
    console.error('Error inserting comic:', error.message);
    throw error;
  }
};

// Updates the information of the comic in the database
const updateComic = async (comicId, updatedDetails) => {
  try {
    const { title, author_name, genre_name, publication_date, description } = updatedDetails;
    
    const authorID = await getOrCreateAuthor(author_name);
    const genreID = await getOrCreateGenre(genre_name);

    const sql = 'UPDATE comics SET title = ?, authorID = ?, genreID = ?, publication_date = ?, description = ? WHERE comicID = ?';
    const values = [title, authorID, genreID, publication_date, description, comicId];
    await db.query(sql, values);
  } catch (error) {
    console.error('Error updating comic:', error.message);
    throw error;
  }
};

// Service that increments the number of visits for a comic
const incrementVisits = async (comicId) => {
  try {
    const results = await db.query('UPDATE comics SET visits = visits + 1 WHERE comicID = ?', [comicId]);
    return results;
  } catch (error) {
    console.error('Error incrementing visits:', error.message);
    throw error;
  }
};

// Service that deletes a comic from the database
const deleteComic = async (comicId) => {
  try {
    const sql = 'DELETE FROM comics WHERE comicID = ?';
    await db.query(sql, [comicId]);
  } catch (error) {
    console.error('Error deleting comic:', error.message);
    throw error;
  }
};

module.exports = {
  getComics,
  getComicById,
  getComicIdByTitle,
  getComicsByAuthor,
  getComicsByGenre,
  getComicsByDate,
  getOrCreateAuthor,
  getOrCreateGenre,
  getGenreNameById,
  getAuthorNameById,
  uploadComic,
  updateComic,
  incrementVisits,
  deleteComic,
};
