"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Bookmarks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      PubUserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "PubUsers",
          key: "id",
        },
      },
      JobId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Jobs",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Bookmarks")
  },
}
npx sequelize model:create --name Bookmark --attributes PubUserId:integer,CuisineId:integer