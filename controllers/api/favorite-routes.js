const router = require('express').Router();
const { UserMovie, Movie } = require('../../models');

// The `/api/follow` endpoint

router.post('/', async (req, res) => {
    try {
        console.log('finding movie')
        const movieData = await Movie.findOne({
            where: { movie_title: req.body.favoriteMovie}
        })
        console.log(movieData)
        let favoriteObject = {
            user_id: req.session.userId,
            movie_id: movieData.id,
            has_watched: false
        }
        console.log(favoriteObject)
        const followData = await UserMovie.create(favoriteObject);
        res.status(200).json(followData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;