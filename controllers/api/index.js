const router = require('express').Router();

const userRoutes = require('./user-routes');
const movieRoutes = require('./movie-routes');
const reviewRoutes = require('./review-routes');

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;
