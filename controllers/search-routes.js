const router = require('express').Router();
const axios = require('axios');
const { Movie } = require('../models');


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
                where: { movie_title: singleMovie.movie_title}
            })
            const movieId = movieData.id

            if (movieData) {
                const userId = req.session.userId
                console.log(movieId)
                console.log('found entry')
                res.render('singleMovie', {singleMovie, userId, movieId});
            } else {
                console.log('no entry found')
                const userId = req.session.userId
                Movie.create(singleMovie)
                res.render('singleMovie', {singleMovie, userId, movieId})
            }
        } catch (err) {
            res.status(500).json(err);
        }
    };


        
    });

        
module.exports = router;