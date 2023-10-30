const { authenticationBookmark } = require("../middleware/authentication");
const {
  authorizationBookmark,
  authorizationBookmarkDel,
} = require("../middleware/authorization");

const express = require("express");
const customer = express.Router();

const { Auth, Portal, Public } = require("../controllers");

customer.get("/", (req, res) =>
  res.status(200).json({ message: "Goodbye world from public !" })
);

customer.post("/login", Public.login);
customer.post("/register", Public.register);
customer.get("/jobs", Public.jobFilter);
customer.get("/jobs/:id", Public.jobDetail);
customer.get("/bookmark", authenticationBookmark, Public.getBookmark);
customer.post(
  "/bookmark/:JobId",
  authenticationBookmark,
  authorizationBookmark,
  Public.addBookmark
);
customer.delete(
  "/bookmark/:id",
  authenticationBookmark,
  authorizationBookmarkDel,
  Public.deleteBookmark
);

module.exports = { customer };
