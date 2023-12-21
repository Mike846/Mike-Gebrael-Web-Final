const axios = require('axios');

// returns a random cat fact from Cat Fact API
const getRandomCatFact = async () => {
  try {
    const response = await axios.get('https://catfact.ninja/fact');
    return response.data.fact;
  } catch (error) {
    console.error('Error fetching cat fact:', error.message);
    throw error;
  }
};

module.exports = {
  getRandomCatFact,
};