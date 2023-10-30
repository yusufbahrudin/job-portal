const { User, Company, Job, Bookmark } = require("../models")

const authorization = async (req, res, next) => {
  try {
    const job = await Job.findByPk(req.params.id)

    if (!job) {
      throw { name: "Not Found", message: "Job not found" }
    }

    if (job.authorId === req.user.id || req.user.role === "admin") {
      next()
    } else {
      throw { name: "Forbidden", message: "Access Forbidden" }
    }
  } catch (err) {
    next(err)
  }
}

const authorizationStatus = async (req, res, next) => {
  try {
    const job = await Job.findByPk(req.params.id)

    if (!job) {
      throw { name: "Not Found", message: "Job not found" }
    }

    if (req.user.role === "admin") {
      next()
    } else {
      throw { name: "Forbidden", message: "Access Forbidden" }
    }
  } catch (err) {
    next(err)
  }
}

const authorizationBookmark = async (req, res, next) => {
  try {
    console.log(req.params);
    const job = await Job.findByPk(req.params.JobId)

    if (!job) throw { name: "Not Found", message: "Job not found" }

    if (req.user.role === "customer") {
      next()
    } else {
      throw { name: "Forbidden", message: "Access Forbidden" }
    }
  } catch (err) {
    next(err)
  }
}

const authorizationBookmarkDel = async (req, res, next) => {
  try {
    console.log(req.params);
    const bookmark = await Bookmark.findByPk(req.params.id)

    if (!bookmark) throw { name: "Not Found", message: "Bookmark not found" }

    if (req.user.role === "customer" && req.user.id === bookmark.PubUserId) {
      next()
    } else {
      throw { name: "Forbidden", message: "Access Forbidden" }
    }
  } catch (err) {
    next(err)
  }
}

module.exports = { authorization, authorizationStatus, authorizationBookmark, authorizationBookmarkDel }
