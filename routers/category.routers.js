const express = require("express");
const { createCategory } = require("../controllers/category.controller");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");

const categoryRouter = express.Router();

categoryRouter.post("/create", authenticate, authorize(["MANAGER"]),createCategory);

module.exports = {
  categoryRouter
};
