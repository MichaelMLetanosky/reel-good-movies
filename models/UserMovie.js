const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class UserMovie extends Model {}

//Keeps track of movies that user want to add to a watch list or if we have time add to a favorites list

UserMovie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      }
    },
    movie_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'movie',
        key: 'id',
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_movie',
  }
);

module.exports = UserMovie;
