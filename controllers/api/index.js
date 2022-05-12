const router = require('express').Router();

const userRoutes = require('./user-routes');
const movieRoutes = require('./movie-routes');
const reviewRoutes = require('./review-routes');
const followRoutes = require('./follow-routes');

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('/reviews', reviewRoutes);
router.use('/follow', followRoutes);

module.exports = router;
