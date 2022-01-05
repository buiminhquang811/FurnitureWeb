const { Producer } = require("../models");

const express = require("express");
const { createProducer, getAllProducer, updateProducer, deleteProducer } = require("../controllers/producer.controller");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");
const {checkExist} = require("../middlewares/validations/checkExist");

const producerRouter = express.Router();

producerRouter.post("/create", authenticate, authorize(["MANAGER"]), createProducer);
producerRouter.get("/all-producers", getAllProducer);
producerRouter.put("/edit/:id", authenticate, authorize(["MANAGER"]), checkExist(Producer), updateProducer)
producerRouter.delete("/:id", authenticate, authorize(["MANAGER"]), checkExist(Producer), deleteProducer)

module.exports = {
  producerRouter
};
