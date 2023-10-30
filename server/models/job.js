"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    static associate(models) {
      Job.belongsTo(models.User, { foreignKey: "authorId" });
      Job.belongsTo(models.Company, { foreignKey: "companyId" });
    }
  }
  Job.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Title is required !" },
          notNull: { msg: "Title is required !" },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Description URL is required !" },
          notNull: { msg: "Description URL is required !" },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Image URL is required !" },
          notNull: { msg: "Image URL is required !" },
        },
      },
      companyId: DataTypes.INTEGER,
      authorId: DataTypes.INTEGER,
      jobType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Job type is required !" },
          notNull: { msg: "Job type is required !" },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Job"
    }
  );
  return Job;
};
