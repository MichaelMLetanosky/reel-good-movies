let movieInputEl = document.getElementById('movie-title');
let movieFormEl = document.getElementById('movie-form');

const movieSearchHandler = function (event) {
    event.preventDefault();

    var movieTitle = movieInputEl.value.trim();
    if (movieTitle) {
        getMovieRepos(movieTitle);
    } else {
        alert('Please enter a movie title.');
    }
};

movieFormEl.addEventListener('submit', movieSearchHandler);

const getMovieRepos = function (movieTitle) {

    let apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=a52d3acc220c86bfeeb8e86d712b26aa&query=${movieTitle}`

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    const movieTitles = [];
                    for (let i = 0; i < 6; i++) {
                        const movieTitle = data.results[i].original_title;
                        movieTitles.push(movieTitle);
                    }
                    console.log(movieTitles);
                    getMovieDetails(movieTitles);
                });
        };
});
}

function getMovieDetails(data) {
    const movieDetails = [];
    movieData = data.forEach(function(movieTitle) {

let apiUrl = `https://www.omdbapi.com/?apikey=1d2b52b9&t=${movieTitle}`

fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (movie) {
                //this could be a HTML card...an array of HTML 
               let singleMovie = {
                    title: movie.Title,
                    imdbID: movie.imdbID,
                    movie_poster: movie.Poster,
                    director: movie.Director,
                    runtime: movie.Runtime,
                    movie_rating: movie.Rated,
                    releaseDate: movie.Released,
                    actors: movie.Actors,
                    plot: movie.Plot,
                    review_rating: movie.imdbRating,
                };
                movieDetails.push(singleMovie);
                appendingDoom("./seeds/movieData.json", movieDetails);
                //how to I post this information to my data base
                // createCookie('moviecookies', JSON.stringify(movieDetails))
                // window.localStorage.setItem("movieDetails", JSON.stringify(movieDetails));

            });
        };
 
    });
});
}

//appending to JSOM file
function appendingDoom(fileName, data) {
    fs.appendFile(fileName, data, (err) => {
        if (err) {
            console.log(err);
        }
    });
}