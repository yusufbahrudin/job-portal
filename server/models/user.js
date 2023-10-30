'use strict';
const { hash } = require('../helpers/hash');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Job, { foreignKey: "authorId" })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "Username is required !" },
        notNull: { msg: "Username is required !" }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "Email already register !" },
      validate: {
        notEmpty: { msg: "Email is required !" },
        notNull: { msg: "Email is required !" },
        isEmail: { msg: "Invalid email !" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Password is required !" },
        notNull: { msg: "Password is required !" },
        len: [5, 50]
      }
    },
    role: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Phone number is required !" },
        notNull: { msg: "Phone number is required !" }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Address is required !" },
        notNull: { msg: "Address is required !" }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user) => {
        user.password = hash(user.password)
      }
    }
  });
  return User;
};