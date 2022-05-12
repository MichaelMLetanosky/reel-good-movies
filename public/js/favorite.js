const favoriteMovie = async (event) => {
    event.preventDefault();

    const favoriteMovie = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    const favoriteMovieReform = favoriteMovie.replace(/%20/g," ")
    console.log(favoriteMovieReform)

    const response = await fetch('/api/favorite', {
      method: 'POST',
      body: JSON.stringify({ favoriteMovieReform }),
      headers: { 'Content-Type': 'application/json' },
    });
  };
  
  document.querySelector('#add-favorite-button').addEventListener('click', favoriteMovie);