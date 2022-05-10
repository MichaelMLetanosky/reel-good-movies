const router = require('express').Router();
const { Review, User, Movie } = require('../../models');

// The `/api/reviews` endpoint

// get all reviews
router.get('/', async (req, res) => {
    try {
        const movieData = await Review.findAll({
            include: [{ model: User, attributes: ['username'] }, { model: Movie, attributes: ['movie_title']}]
        });
        res.status(200).json(movieData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get one movie
router.get('/:id', async (req, res) => {
    try {
        const movieData = await Review.findByPk(req.params.id, {
            include: [{ model: User, attributes: ['username'] }, { model: Movie, attributes: ['movie_title']}]
        });

        if (!movieData) {
            res.status(404).json({ message: 'No review found with this id!' });
            return;
        }

        res.status(200).json(movieData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Post movie to db
router.post('/', async (req, res) => {
    try {
        const movieData = await Review.create(req.body);

        res.status(200).json(movieData);
    } catch (err) {
        res.status(500).json(err);
    }
});


// Updates movie based on its id
router.put('/:id', async (req, res) => {
    try {
        const movieData = await Review.update(
            {
                content: req.body.content,
                review_likes: req.body.review_likes,
                user_id: req.body.user_id,
                movie_id: req.body.movie_id
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );

        if (!movieData) {
            res.status(404).json({ message: 'No review found with this id!' });
            return;
        }

        res.status(200).json(movieData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete movie from db by ID
router.delete('/:id', async (req, res) => {
    try {
        const movieData = await Review.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!movieData) {
            res.status(404).json({ message: 'No review found with this id!' });
            return;
        }

        res.status(200).json(movieData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;