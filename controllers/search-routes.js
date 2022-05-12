const router = require('express').Router();
const axios = require('axios');


router.get('/:movieTitle', (req, res) => {
    let apiUrl = `https://www.omdbapi.com/?apikey=1d2b52b9&t=${req.params.movieTitle}`
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
            // console.log(movieTitles);
            // res.status(200).json(data);
            // const sadMovies = getMovieDetails(movieTitlesArray);
            // let movieResults = movieTitlesArray.map(getMovieDetails())
            // console.log(movieResults);
            // console.log(movieResults);
            res.render('singleMovie', singleMovie);
            // return movieResults;
        });


//     function getMovieDetails(data) {
//         // console.log(data);

//         const movieData = Promise.all(data.map((movieTitle) => {
//             let apiUrl = `https://www.omdbapi.com/?apikey=1d2b52b9&t=${movieTitle}`
//             axios.get(apiUrl)
//                 .then(function (response) {
//                     // return response
//                     let singleMovie = {
//                         title: response.data.Title,
//                         imdbId: response.data.imdbID,
//                         movie_poster: response.data.Poster,
//                         director: response.data.Director,
//                         runtime: response.data.Runtime,
//                         movie_rating: response.data.Rated,
//                         releaseDate: response.data.Released,
//                         actors: response.data.Actors,
//                         plot: response.data.Plot,
//                         review_rating: response.data.imdbRating,
//                     }
//                     // movieData.push(singleMovie);
//                     // console.log(singleMovie);
//                     // return singleMovie;
//                 })
//         })).then(
//             console.log(movieData);
//         return movieData;
//         )
//     }
});


// async function getMovieDetails(data) {

//         let apiUrl = `https://www.omdbapi.com/?apikey=1d2b52b9&t=${data}`
//         axios.get(apiUrl)
//             .then(function (response) {
//                 // return response
//                 let singleMovie = {
//                     title: response.data.Title,
//                     imdbId: response.data.imdbID,
//                     movie_poster: response.data.Poster,
//                     director: response.data.Director,
//                     runtime: response.data.Runtime,
//                     movie_rating: response.data.Rated,
//                     releaseDate: response.data.Released,
//                     actors: response.data.Actors,
//                     plot: response.data.Plot,
//                     review_rating: response.data.imdbRating,
//                 }
//                 // console.log(singleMovie);
//                 return singleMovie;
//             })   
//         }                  






module.exports = router;