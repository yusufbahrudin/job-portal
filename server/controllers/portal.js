const { log } = require("../helpers/log")
const { User, Company, Job, History } = require("../models")

class Portal {
  static async job(req, res, next) {
    try {
      const jobs = await Job.findAll({
        order: [["id", "ASC"]],
        include: {
          model: User,
          attributes: { exclude: ["password"] },
        },
      })
      res.status(200).json(jobs)
    } catch (err) {
      next(err)
    }
  }

  static async createJob(req, res, next) {
    try {
      const { title, description, imgUrl, jobType, companyId, status } = req.body
      const job = await Job.create({
        title,
        description,
        imgUrl,
        jobType,
        companyId,
        status,
        authorId: req.user.id,
      })

      if (job)
        log({
          title: job.title,
          description: `New (${job.title}) with id ${job.id} created`,
          updatedBy: req.user.username,
        })

      res.status(201).json(job)
    } catch (err) {
      next(err)
    }
  }

  static async jobDetail(req, res, next) {
    try {
      const job = await Job.findByPk(req.params.id)

      if (!job) throw { name: "Not Found", message: "404 Data Not Found" }

      res.status(200).json(job)
    } catch (err) {
      next(err)
    }
  }

  static async deleteJob(req, res, next) {
    try {
      const job = await Job.findByPk(req.params.id)
      const deleteJob = await Job.destroy({ where: { id: req.params.id } })

      if (deleteJob === 0) throw { name: "Not Found", message: "404 Data Not Found" }

      res.status(200).json({ message: `Job (${job.title}) success to delete` })
    } catch (err) {
      next(err)
    }
  }

  static async company(req, res, next) {
    try {
      const companies = await Company.findAll()
      res.status(200).json(companies)
    } catch (err) {
      next(err)
    }
  }

  static async setStatus(req, res, next) {
    const { id, status } = req.params
    try {
      if (status !== "Active" && status !== "Inactive" && status !== "Archived") {
        throw { name: "Invalid Status", message: "Status not found" }
      }

      const job = await Job.findOne({ where: { id } })

      if (!job) {
        throw { name: "Not Found", message: "404 Data Not Found" }
      }

      const update = await Job.update({ status }, { where: { id } })
      if (update[0] > 0)
        log({
          title: job.title,
          description: `Job (${job.title}) with id ${job.id} has been updated from ${job.status} to ${status}`,
          updatedBy: req.user.username,
        })

      res.status(200).json({
        message: `Job (${job.title}) with id ${job.id} has been updated from ${job.status} to ${status}`,
      })
    } catch (err) {
      next(err)
    }
  }

  static async editJob(req, res, next) {
    const { id } = req.params
    const { title, description, imgUrl, companyId, jobType, status } = req.body

    try {
      const job = await Job.findOne({ where: { id } })

      if (!job) {
        throw { name: "Not Found", message: "404 Data Not Found" }
      }

      const update = await Job.update({ title, description, imgUrl, companyId, jobType, status }, { where: { id } })

      if (update[0] > 0) {
        log({ title, description: `Job with id ${id} updated`, updatedBy: req.user.username })
      }

      res.status(200).json({ message: `Job with id ${id} updated` })
    } catch (err) {
      next(err)
    }
  }

  static async history(req, res, next) {
    try {
      const data = await History.findAll({ order: [["id", "DESC"]] })
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = Portal
