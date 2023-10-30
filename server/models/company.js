'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      Company.hasMany(models.Job, { foreignKey: "companyId" })
    }
  }
  Company.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        notEmpty: { msg: "Name is required !" },
        notNull: { msg: "Name is required !" }
      }
    },
    companyLogo: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        notEmpty: { msg: "Company logo is required !" },
        notNull: { msg: "Company logo is required !" }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        notEmpty: { msg: "Location is required !" },
        notNull: { msg: "Location is required !" }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "Email is required !" },
        notNull: { msg: "Email is required !" },
        isEmail: { msg: "Invalid email !" }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        notEmpty: { msg: "Description is required !" },
        notNull: { msg: "Description is required !" }
      }
    }
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};