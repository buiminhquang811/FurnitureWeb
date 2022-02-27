const express = require("express");
const { userRouter } = require("./user.routers");
const { categoryRouter } = require("./category.routers");
const {producerRouter} = require("./producer.routers");
const { productRouter } = require("./product.routers");
const { orderRouter } = require("./order.routers");

const rootRouter = express.Router();

rootRouter.use("/users", userRouter);
rootRouter.use("/categories", categoryRouter);
rootRouter.use("/producers", producerRouter);
rootRouter.use("/products", productRouter)
rootRouter.use("/orders", orderRouter)


module.exports = {
  rootRouter,
  categoryRouter,
  producerRouter,
  productRouter,
  orderRouter
};
