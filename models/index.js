const User = require('./User');
const Movie = require('./Movie');
const Review = require('./Review');
const UserMovie = require('./UserMovie');
const FollowedUser = require('./FollowedUser');

Review.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Review, {
    foreignKey: 'user_id',
});

Review.belongsTo(Movie, {
    foreignKey: 'movie_id',
});

Movie.hasMany(Review, {
    foreignKey: 'movie_id',
});

// For to watch movies

Movie.belongsToMany(User, {
    through: {
        model: UserMovie,
        unique: false
    }
});

User.belongsToMany(Movie, {
    through: {
        model: UserMovie,
        unique: false
    }
});

// For Followed Users

User.belongsToMany(User, {
    as: "follower",
    foreignKey: 'follower_id',
    through: FollowedUser
});

User.belongsToMany(User, {
    as: "followee",
    foreignKey: 'followee_id',
    through: FollowedUser
});


module.exports = { User, Movie, Review, UserMovie, FollowedUser };
