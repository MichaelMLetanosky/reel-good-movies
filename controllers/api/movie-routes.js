const router = require('express').Router();
const { Movie, Review } = require('../../models');

// The `/api/movies` endpoint

// get movie search results
//this will pull from our movie database and populate our search results handlebars
router.get('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
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
// this will either post the search results or when the user clicks on the single movie they want to see
router.post('/', async (req, res) => {
    try {
        const movieData = await Movie.create(req.body);
        res.status(200).json(movieData);
    } catch (err) {
        res.status(500).json(err);
    }
});


// Updates movie based on its id
// not sure if update route is needed for movies. will comment out for now
// router.put('/:id', async (req, res) => {
//     try {
//         const movieData = await Movie.update(
//             {
//                 movie_title: req.body.movie_title,
//                 tmdb_id: req.body.tmdb_id,
//             },
//             {
//                 where: {
//                     id: req.params.id,
//                 },
//             }
//         );

//         if (!movieData) {
//             res.status(404).json({ message: 'No movie found with this id!' });
//             return;
//         }

//         res.status(200).json(movieData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// Delete movie from db by ID
// not sure if delete route is needed for movies. will comment out for now
// router.delete('/:id', async (req, res) => {
//     try {
//         const movieData = await Movie.destroy({
//             where: {
//                 id: req.params.id,
//             },
//         });

//         if (!movieData) {
//             res.status(404).json({ message: 'No movie found with this id!' });
//             return;
//         }

//         res.status(200).json(movieData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

module.exports = router;