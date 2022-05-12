const movieSearchHandler = function (event) {
    event.preventDefault();

    var movieTitle = document.getElementById("movie-name").value.trim();
    console.log(movieTitle)
    if (movieTitle) {
        document.location.replace(`/search/${movieTitle}`)
    } else {
        alert('Please enter a movie title.');
    }
};

document.getElementById('movie-form').addEventListener('click', movieSearchHandler);




//appending to JSON file
function appendingDoom(fileName, data) {
    fs.appendFile(fileName, data, (err) => {
        if (err) {
            console.log(err);
        }
    });
}

const movieHomepageSearchHandler = function (event) {
    event.preventDefault();

    var movieTitle = document.getElementById("movie-title").value.trim();
    console.log(movieTitle)
    if (movieTitle) {
        document.location.replace(`/search/${movieTitle}`)
    } else {
        alert('Please enter a movie title.');
    }
};

document.getElementById('user-movie-search').addEventListener('click', movieHomepageSearchHandler);
