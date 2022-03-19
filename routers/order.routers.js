const { Order } = require("../models");

const express = require("express");
const { createOrder, getAllOrder, getOneOrder, updateOrder, rejectOrder} = require("../controllers/order.controller");

const orderRouter = express.Router();

orderRouter.post("/create", createOrder);
orderRouter.get("/all-orders", getAllOrder);
orderRouter.get("/:id", getOneOrder);
orderRouter.put("/update/:id", updateOrder);
orderRouter.put("/reject/:id", rejectOrder);


module.exports = {
  orderRouter
};
