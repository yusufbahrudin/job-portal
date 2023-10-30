const { User, Company, Job, PubUser } = require("../models")
const { verifyToken } = require("../helpers/token")

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers

    if (!access_token) throw { name: "Unauthorized", message: "Invalid Token" }

    const token = verifyToken(access_token)
    const user = await User.findByPk(token.id)

    if (!user) throw { name: "Unauthorized", message: "Invalid token" }

    req.user = user
    next()
  } catch (err) {
    next(err)
  }
}

const authenticationBookmark = async (req, res, next) => {
  try {
    const { access_token } = req.headers

    if (!access_token) throw { name: "Unauthorized", message: "Invalid Token" }

    const token = verifyToken(access_token)
    const user = await PubUser.findByPk(token.id)

    if (!user) throw { name: "Unauthorized", message: "Invalid token" }

    req.user = user
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = { authentication, authenticationBookmark }
