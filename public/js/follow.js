const followUser = async (event) => {
    event.preventDefault();

    const followeeUsername = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

    const response = await fetch('/api/follow', {
      method: 'POST',
      body: JSON.stringify({ followeeUsername }),
      headers: { 'Content-Type': 'application/json' },
    });
  };
  
  document.querySelector('#follow-button').addEventListener('click', followUser);