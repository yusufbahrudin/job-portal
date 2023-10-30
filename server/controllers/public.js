const { User, Company, Job, History, PubUser, Bookmark } = require("../models")
const { Op } = require("sequelize")
const { hash, compareHash } = require("../helpers/hash")
const { getToken } = require("../helpers/token")
const { OAuth2Client } = require("google-auth-library")
const axios = require("axios")

class Public {
  static async register(req, res, next) {
    const { email, password } = req.body
    try {
      const newUser = await PubUser.create({ email, password, role: "customer" })
      const token = getToken({ id: newUser.id, email: newUser.email, role: newUser.role })

      res.status(201).json({
        id: newUser.id,
        role: newUser.role,
        email: newUser.email,
        token,
      })
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      if (!email || !password) throw { name: "Unauthorized", message: "Username & Password required !" }

      const user = await PubUser.findOne({ where: { email } })
      if (!user || !(await compareHash(password, user.password))) throw { name: "Unauthorized", message: "Invalid email or password !" }

      const token = getToken({ id: user.id, email, role: user.role })
      res.status(200).json({ id: user.id, email: user.email, role: user.role, token })
    } catch (err) {
      next(err)
    }
  }

  static async jobFilter(req, res, next) {
    try {
      let { page = 1, search } = req.query

      const limit = 6
      const option = { limit }

      option.offset = page * option.limit - option.limit

      if (search) option.where = { title: { [Op.iLike]: `%${search}%` } }

      const data = await Job.findAll(option)
      const totalData = await Job.count({ where: option.where })

      console.log(option)

      const result = {
        search,
        currentPage: page,
        totalPage: Math.ceil(totalData / limit),
        total: data.length,
        data,
      }

      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  static async jobDetail(req, res, next) {
    try {
      const job = await Job.findByPk(req.params.id)

      if (!job) throw { name: "Not Found", message: "404 Data Not Found" }

      const { data } = await axios({
        url: "https://api.qr-code-generator.com/v1/create?access-token=Fso6qkjdABmDziUPWSetEttVvQXD1o-PAnl5jXLSIvcv_dKUIXFAFD6idhVBbIsF",
        method: "GET",
        params: {
          frame_name: "no-frame",
          qr_code_text: `https://vue-week3.web.app/detail/${req.params.id}`,
          image_format: "SVG",
        },
      })

      res.status(200).json({ ...job.toJSON(), QRcode: data })
    } catch (err) {
      next(err)
    }
  }

  static async getBookmark(req, res, next) {
    try {
      const bookmark = await Bookmark.findAll({
        attributes: { exclude: ["updatedAt", "createdAt"] },
        include: Job,
        where: { PubUserId: req.user.id },
        order: [["id", "DESC"]],
      })
      res.status(200).json(bookmark)
    } catch (err) {
      next(err)
    }
  }

  static async addBookmark(req, res, next) {
    try {
      const { JobId } = req.params
      const bookmark = await Bookmark.create({ PubUserId: req.user.id, JobId })
      res.status(201).json(bookmark)
    } catch (err) {
      next(err)
    }
  }

  static async deleteBookmark(req, res, next) {
    try {
      const { id } = req.params
      const bookmark = await Bookmark.destroy({ where: { id } })
      res.status(201).json({ message: `Bookmark with id (${id}) deleted` })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = Public
