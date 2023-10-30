'use strict';

const { hash } = require('../helpers/hash');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    const users = require('../data/user.json').map((user) => {
      user.createdAt = new Date()
      user.updatedAt = new Date()
      user.password = hash(user.password)
      return user
    })

    const companies = require('../data/company.json').map((company) => {
      company.createdAt = new Date()
      company.updatedAt = new Date()
      return company
    })

    const jobs = require('../data/job.json').map((job) => {
      job.createdAt = new Date()
      job.updatedAt = new Date()
      return job
    })
    
    await queryInterface.bulkInsert("Users", users)
    await queryInterface.bulkInsert("Companies", companies)
    await queryInterface.bulkInsert("Jobs", jobs)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Jobs")
    await queryInterface.bulkDelete("Users")
    await queryInterface.bulkDelete("Companies")
  }
};
