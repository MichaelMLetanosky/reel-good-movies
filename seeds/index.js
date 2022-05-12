const sequelize = require('../config/connection');
const { User, Movie, Review, UserMovie, FollowedUser } = require('../models');
// TODO Seed files for 

const userData = require('./userData.json');
const movieData = require('./movieData.json');
const reviewData = require('./reviewData.json');
const userMovieData = require('./userMovieData.json');
const followedUserData = require('./followedUserData.json');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Movie.bulkCreate(movieData)

  await Review.bulkCreate(reviewData)

  await UserMovie.bulkCreate(userMovieData)

  await FollowedUser.bulkCreate(followedUserData)

  process.exit(0);
};

seedAll();
