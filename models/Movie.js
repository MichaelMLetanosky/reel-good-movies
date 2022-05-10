const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Movie extends Model {}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    movie_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // TMDB id to make fetching additional information easier
    tmdb_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    movie_poster: {
      //this will be a URL 
      type: DataTypes.STRING,
      allowNull: false
    },
    director: {
      type: DataTypes.STRING,
      allowNull: false
    },
    runtime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    movie_rating: {
      type: DataTypes.STRING,
      allowNull: false
    },
    releaseDate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    actors: {
      type: DataTypes.STRING,
      allowNull: false
    },
    plot: {
      type: DataTypes.STRING,
      allowNull: false
    },
    review_ratings: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'movie',
  }
);

module.exports = Movie;
