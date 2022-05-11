const router = require('express').Router();
const axios = require('axios');
const { response } = require('express');

router.get('/:movieTitle', (req, res) => {

    let apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=a52d3acc220c86bfeeb8e86d712b26aa&query=${req.params.movieTitle}`
    axios.get(apiUrl)
        .then(function (response) {
            console.log("the api is working");
            const movieTitlesArray = [];
            for (let i = 0; i < 6; i++) {
                const movieTitle = response.data.results[i].original_title;
                movieTitlesArray.push(movieTitle);
            }
            // console.log(movieTitles);
            // res.status(200).json(data);
            // console.log(movieTitlesArray);
            let movieResults = getMovieDetails(movieTitlesArray);
            // console.log(movieResults);
            // res.render('moviecard', singleMovie);
            return movieResults;
        });

    async function getMovieDetails(data) {

        console.log(data);
        movieData = await data.map((movieTitle) => {
            let apiUrl = `https://www.omdbapi.com/?apikey=1d2b52b9&t=${movieTitle}`
            axios.get(apiUrl)
                .then(function (response) {
                    let singleMovie = {
                        title: response.data.Title,
                        imdbId: response.data.imdbID,
                        movie_poster: response.data.Poster,
                        director: response.data.Director,
                        runtime: response.data.Runtime,
                        movie_rating: response.data.Rated,
                        releaseDate: response.data.Released,
                        actors: response.data.Actors,
                        plot: response.data.Plot,
                        review_rating: response.data.imdbRating,
                    }
                    // console.log(singleMovie);
                    return singleMovie;
                })                     
                .then()
        });
        console.log(movieData);
        return movieData;
    }
});

module.exports = router;


