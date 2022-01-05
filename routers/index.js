const express = require("express");
const { userRouter } = require("./user.routers");
const { categoryRouter } = require("./category.routers");
const {producerRouter} = require("./producer.routers")
const rootRouter = express.Router();

rootRouter.use("/users", userRouter);
rootRouter.use("/categories", categoryRouter);
rootRouter.use("/producers", producerRouter);

module.exports = {
  rootRouter,
  categoryRouter,
  producerRouter
};
