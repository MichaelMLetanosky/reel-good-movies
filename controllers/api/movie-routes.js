const router = require('express').Router();
const { Movie, Review } = require('../../models');

// The `/api/movies` endpoint

// get movie search results
//this will pull from our movie database and populate our search results handlebars
router.get('/movies', async (req, res) => {
    try {
        const movieData = await Movie.findAll({
            attributes: ['title', 'releaseDate', 'movie_rating', 'movie_poster']
        });
        res.status(200).json(movieData);
        res.render('movie.card')
        //update to correct handlebar file
    } catch (err) {
        res.status(500).json(err);
    }
});

// get one movie from the movie database and populate our single movie page
router.get('/movies/:id', async (req, res) => {
    try {
        const movieData = await Movie.findByPk(req.params.id, {
            include: [{ model: Review }],
            attibutes: [
                'title',
                'movie_poster',
                'releaseDate',
                'director',
                'runtime',
                'plot',
                'actors',
                'review_rating',
            ],
        })
        res.status(200).json(movieData);
        const singleMovie = movieData.get({ plain: true });
        res.render('single.movie', singleMovie);
        if (!movieData) {
            res.status(404).json({ message: 'No movie found with this id!' });
            return;
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Post movie to db
router.post('/', async (req, res) => {
    try {
        const movieData = await Movie.create(req.body);
        res.status(200).json(movieData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;