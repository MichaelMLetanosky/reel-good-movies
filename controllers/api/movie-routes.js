const router = require('express').Router();
const { Movie, Review } = require('../../models');

// The `/api/movies` endpoint

// get all movies
router.get('/', async (req, res) => {
  try {
    const movieData = await Movie.findAll({
      // be sure to include its associated Category and Tag data
      include: [{ model: Review}]
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;