

const reviewFormHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#review-content').value.trim();
    const review_likes = document.querySelector('input[name="rating"]:checked').value;
    const userId = document.querySelector("#ugly-userId").textContent;
    // const movieName = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
    const movie_id = document.querySelector("#ugly-movieId").textContent;

    console.log({
      content: content,
      review_likes: review_likes,
      user_id: userId,
      movie_id: movie_id
    })
    
    if (content && review_likes) {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify({
          content: content,
          review_likes: review_likes,
          user_id: userId,
          movie_id: movie_id,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        console.log("success")
      } else {
        alert('Failed to work.');
      }
    }
  };

  document.querySelector("#review-submit").addEventListener("click", reviewFormHandler)