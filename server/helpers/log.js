const { User, Company, Job, History } = require("../models");

const log = async (obj) => {
  const { title, description, updatedBy } = obj;

  const coba = await History.create({ title, description, updatedBy });
};

module.exports = { log };
