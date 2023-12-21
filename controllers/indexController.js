const indexService = require('../services/indexService');
const randomCatFacts = require('../External API/catFacts');

// Render the home page with featured comics and a random fact about cats
const getHomePage = async (req, res) => {
  try {
    const catFact = await randomCatFacts.getRandomCatFact();

    const [featuredComics] = await indexService.getFeaturedComics();

    res.render('index', { featuredComics, catFact });
  } catch (error) {
    console.error('Error getting home page:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

// Perform a search for comics based on the provided query.
const searchComics = async (req, res) => {
  const { query } = req.query;

  try {
    const [searchResults] = await indexService.searchComics(query);
    res.render('searchResults', { searchResults, query });
  } catch (error) {
    console.error('Error searching for comics:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getHomePage,
  searchComics,
};
