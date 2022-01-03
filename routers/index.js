const express = require("express");
const { userRouter } = require("./user.routers");
const { categoryRouter } = require("./category.routers");
const rootRouter = express.Router();

rootRouter.use("/users", userRouter);
rootRouter.use("/categories", categoryRouter);

module.exports = {
  rootRouter,
  categoryRouter
};
