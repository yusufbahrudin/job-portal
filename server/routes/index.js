const { Portal, Auth } = require("../controllers")
const { authentication } = require("../middleware/authentication")
const { authorization, authorizationStatus } = require("../middleware/authorization")

const express = require("express")
const router = express.Router()

const { customer } = require("./customer")

router.get("/", (req, res) => res.status(200).send("Goodbye world!"))

router.use("/public", customer)

router.post("/register", Auth.register)
router.post("/login", Auth.login)
router.post("/login/google", Auth.googleLogin)

router.use(authentication)

router.get("/jobs", Portal.job)
router.post("/jobs", Portal.createJob)
router.get("/jobs/:id", Portal.jobDetail)
router.delete("/jobs/:id", authorization, Portal.deleteJob)
router.put("/jobs/:id", authorization, Portal.editJob)
router.patch("/jobs/:id/:status", authorizationStatus, Portal.setStatus)

router.get("/companies", Portal.company)

router.get("/history", Portal.history)

module.exports = router
