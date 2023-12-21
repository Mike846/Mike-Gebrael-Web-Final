const cron = require('node-cron');
const comicService = require('./services/comicService');

// Cron job to mark all comics with more than 10 visits as featured comics everyday
const task = cron.schedule('0 0 * * *', async () => {
  try {
    const featuredComics = await comicService.markComicsAsFeatured();
    console.log('Marked comics as featured:', featuredComics);
  } catch (error) {
    console.error('Error scheduling job:', error.message);
  }
});

module.exports = task;
