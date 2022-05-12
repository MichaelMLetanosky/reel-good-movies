const favoriteMovie = async (event) => {
    event.preventDefault();

    const favoriteMovie = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    console.log(favoriteMovie)

    const response = await fetch('/api/favorite', {
      method: 'POST',
      body: JSON.stringify({ favoriteMovie }),
      headers: { 'Content-Type': 'application/json' },
    });
  };
  
  document.querySelector('#add-favorite-button').addEventListener('click', favoriteMovie);