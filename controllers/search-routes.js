const router = require('express').Router();
const axios = require('axios').default;

router.get('/:movieTitle', (req, res) => {
 
    const getMovieRepos = function (movieTitle) {

        let apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=a52d3acc220c86bfeeb8e86d712b26aa&query=Batman`

         axios.get(apiUrl)
            .then(function (response) {
                if (response.ok) {
                    return response.data;
                    // (function (data) {
                    //     console.log(data);
                    // const movieTitles = [];
                    // for (let i = 0; i < 6; i++) {
                    //     const movieTitle = data.results[i].original_title;
                    //     movieTitles.push(movieTitle);
                    // }
                    let movieResults = getMovieDetails(movieTitles);
                    return movieResults;
                    //     });
                    // };
                    // });
                }
            });
        }
        const moviesPlease = getMovieRepos(req.body.movieTitle)
        res.status(200).json(moviesPlease);  
    });


    //     function getMovieDetails(data) {
    //         const movieDetails = [];
    //         movieData = data.forEach(function (movieTitle) {

    //             let apiUrl = `https://www.omdbapi.com/?apikey=1d2b52b9&t=${movieTitle}`

    //             axios.get(apiUrl)
    //                 .then(function (response) {
    //                     if (response.ok) {
    //                         response.json()
    //                         .then(function (movie) {
    //                             let singleMovie = {
    //                                 title: movie.Title,
    //                                 imdbID: movie.imdbID,
    //                                 movie_poster: movie.Poster,
    //                                 director: movie.Director,
    //                                 runtime: movie.Runtime,
    //                                 movie_rating: movie.Rated,
    //                                 releaseDate: movie.Released,
    //                                 actors: movie.Actors,
    //                                 plot: movie.Plot,
    //                                 review_rating: movie.imdbRating,
    //                             };
    //                             movieDetails.push(singleMovie);
    //                         });
    //                     };

    //                 });
    //         });
    //         return movieDetails;
    //     }
        // const moviesPlease = getMovieRepos(req.params.movieTitle)
        // res.status(200).json(moviesPlease);
        // res.render('movieCard', movieDetails);


    module.exports = router;


