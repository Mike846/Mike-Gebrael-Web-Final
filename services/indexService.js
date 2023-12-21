const db = require('../database/db');

// Service that returns 5 featured comics and if there are none returns the first 5 comics in the database
const getFeaturedComics = async () => {
  try {
    let [featured] = await db.query('SELECT * FROM comics WHERE is_featured = true LIMIT 5');

    if (!featured || featured.length === 0) {
      featured = await db.query('SELECT * FROM comics LIMIT 5');
    }

    return featured;
  } catch (error) {
    console.error('Error getting featured comics:', error.message);
    throw error;
  }
};

// Service that searches for comics based on the provided search query
const searchComics = async (query) => {
  try {
    const result = await db.query(
      'SELECT * FROM comics WHERE title LIKE ? OR description LIKE ?',
      [`%${query}%`, `%${query}%`]
    );
    return result;
  } catch (error) {
    console.error('Error searching comics:', error.message);
    throw error;
  }
};

module.exports = {
  getFeaturedComics,
  searchComics,
};
