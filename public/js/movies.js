
const movieSearchHandler = function (event) {
    event.preventDefault();

    var movieTitle = movieInputEl.value.trim();
    console.log(movieTitle);

    if (movieTitle) {
        createMovieList(movieTitle);
        plotContainerEl.textContent = '';
    } else {
        alert('Please enter a movie title.');
    }
};

//Event Listener for when the search button is pressed
movieFormEl.addEventListener('submit', movieSearchHandler);

const getMovieRepos = function (movieTitle) {

    let apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=a52d3acc220c86bfeeb8e86d712b26aa&query=${movieTitle}`

    console.log(apiUrl);

    //API route tesing!
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    // var movieTitle = document.getElementById("titleMe");
                    // var plot = document.getElementById("movie-plot");
                    //Notice the results[0] part! which means we need to pull a certain i of results for our app.
                    // const moviedata = [];
                    const movieTitles = [];
                    for (let i = 0; i < 6; i++) {
                        const movieTitle = data.results[i].original_title;
                        movieTitles.push(movieTitle);
                        // plot: data.results[i].overview,
                        // moviePoster: `https://image.tmdb.org/t/p/w200/${data.results[i].poster_path}`,
                    }
                    console.log(movieTitles);
                    return movieTitles;
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
                    releaseDate: movie.Released,
                    rating: movie.Rated,
                    director: movie.Director,
                    runtime: movie.Runtime,
                    plot: movie.Plot,
                    actors: movie.Actors,
                    poster: movie.Poster,
                };
                movieDetails.push(singleMovie);
            });
        };
 
    });
});
console.log(movieDetails);
console.log(typeof movieDetails);
}