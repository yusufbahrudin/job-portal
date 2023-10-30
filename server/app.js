if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

const { errorHandler } = require("./middleware/errorHandler")

const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const router = require("./routes")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan("dev"))
app.use(cors())
app.use(router)

app.use(errorHandler)

module.exports = { app }
