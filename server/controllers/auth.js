const { User, Company, Job } = require("../models")
const { hash, compareHash } = require("../helpers/hash")
const { getToken } = require("../helpers/token")
const { OAuth2Client } = require("google-auth-library")

class Auth {
  static async register(req, res, next) {
    const { username, email, password, phoneNumber, address, role } = req.body
    try {
      const newUser = await User.create({ username, email, password, phoneNumber, address, role })
      const token = getToken({ id: newUser.id, email: newUser.email, role: newUser.role })

      res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
        email: newUser.email,
        message: `Account ${newUser.username} with email ${newUser.email} registered as ${newUser.role} !`,
        token,
      })
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        throw { name: "Unauthorized", message: "Username & Password required !" }
      }

      const user = await User.findOne({ where: { email } })
      if (!user) throw { name: "Unauthorized", message: "Invalid email or password !" }

      const checkPass = await compareHash(password, user.password)
      if (!checkPass) throw { name: "Unauthorized", message: "Invalid email or password !" }

      const token = getToken({ id: user.id, email, role: user.role })
      res.status(200).json({ id: user.id, username: user.username, email: user.email, role: user.role, token })
    } catch (err) {
      next(err)
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { google_token } = req.headers

      const client = new OAuth2Client()
      const ticket = await client.verifyIdToken({ idToken: google_token, audience: process.env.GOOGLE_CLIENT_ID })
      const payload = ticket.getPayload()

      let user = await User.findOne({ where: { email: payload.email } })

      if (!user) {
        user = await User.create({
          username: payload.name,
          email: payload.email,
          password: "google-login-" + Date.now(),
          role: "staff",
          phoneNumber: "000000000000",
          address: "-",
        })
      }

      const token = getToken({ id: user.id, email: user.email, role: user.role })

      res.status(200).json({ id: user.id, username: user.username, email: user.email, role: user.role, token })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = Auth
