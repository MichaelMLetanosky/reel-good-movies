
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