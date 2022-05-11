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



//appending to JSOM file
function appendingDoom(fileName, data) {
    fs.appendFile(fileName, data, (err) => {
        if (err) {
            console.log(err);
        }
    });
}