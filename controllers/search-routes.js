const router = require('express').Router();
const axios = require('axios');
const { Movie, Review, User } = require('../models');

// uses '/search' endpoint

router.get('/:movieTitle', (req, res) => {
    let apiUrl = `https://www.omdbapi.com/?apikey=1d2b52b9&t=${req.params.movieTitle}`
    axios.get(apiUrl)
        .then(function (response) {
            let singleMovie = {
                movie_title: response.data.Title,
                imdbId: response.data.imdbID,
                movie_poster: response.data.Poster,
                director: response.data.Director,
                runtime: response.data.Runtime,
                movie_rating: response.data.Rated,
                releaseDate: response.data.Released,
                actors: response.data.Actors,
                plot: response.data.Plot,
                review_ratings: response.data.imdbRating,
            }

            movieCheck(singleMovie);
        });

    async function movieCheck(singleMovie) {
        console.log('looking for db entry')
        try {
            const movieData = await Movie.findOne({
                where: { movie_title: singleMovie.movie_title },
                include: [{ model: Review, include: [{ model: User }, { model: User }] }]
            })

            if (movieData) {
                const userStuff = movieData.get({ plain: true })
                const movieId = movieData.id
                const reviews = userStuff.reviews
                const userId = req.session.userId
                console.log('found entry')
                res.render('singleMovie', { singleMovie, userId, movieId, reviews, loggedIn:req.session.loggedIn });
            } else {
                console.log('no entry found')
                const createdMovie = await Movie.create(singleMovie)
                const userId = req.session.userId
                const movieId = createdMovie.id
                const reviews = createdMovie.reviews
                res.render('singleMovie', { singleMovie, userId, movieId, reviews, loggedIn:req.session.loggedIn });
            }
        } catch (err) {
            res.render('404')
        }
    };
});

module.exports = router;