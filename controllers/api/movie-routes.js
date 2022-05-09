const router = require('express').Router();
const { Movie, Review } = require('../../models');

// The `/api/movies` endpoint

// get all movies
router.get('/', async (req, res) => {
    try {
        const movieData = await Movie.findAll({
            include: [{ model: Review }]
        });
        res.status(200).json(movieData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get one movie
router.get('/:id', async (req, res) => {
    try {
        const movieData = await Movie.findByPk(req.params.id, {
            include: [{ model: Review }]
        });

        if (!movieData) {
            res.status(404).json({ message: 'No movie found with this id!' });
            return;
        }

        res.status(200).json(movieData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Post movie to db
router.put('/:id', async (req, res) => {
    try {
        const movieData = await Movie.create(
            {
                movie_title: req.body.movie_title,
                tmdb_id: req.body.tmdb_id,
            }
        );

        if (!movieData) {
            res.status(404).json({ message: 'No movie found with this id!' });
            return;
        }

        res.status(200).json(movieData);
    } catch (err) {
        res.status(500).json(err);
    }
});


// Updates movie based on its id
router.put('/:id', async (req, res) => {
    try {
        const movieData = await Movie.update(
            {
                movie_title: req.body.movie_title,
                tmdb_id: req.body.tmdb_id,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );

        if (!movieData) {
            res.status(404).json({ message: 'No movie found with this id!' });
            return;
        }

        res.status(200).json(movieData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const movieData = await Movie.destroy({
            where: {
                id: req.params.book_id,
            },
        });

        if (!movieData) {
            res.status(404).json({ message: 'No movie found with this id!' });
            return;
        }

        res.status(200).json(movieData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;