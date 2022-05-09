const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class FollowedUser extends Model {}

FollowedUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // The user requesting to follow another users reviews
    follower_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      }
    },
    // The writer of review(s)
    followee_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'followed_user',
  }
);

module.exports = FollowedUser;