const { Category } = require("../models");

const express = require("express");
const { createCategory, getAllCategory, updateCategory } = require("../controllers/category.controller");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");
const {checkEmpty} = require("../middlewares/validations/checkEmpty");
const {checkExist} = require("../middlewares/validations/checkExist");
const {uploadImage} = require("../middlewares/upload/upload-image");

const categoryRouter = express.Router();

//form-data categoriesImg
categoryRouter.post("/create", authenticate, authorize(["MANAGER"]), uploadImage("categoriesImg"),createCategory);
categoryRouter.get("/all-categories", getAllCategory);
categoryRouter.put("/edit/:id", authenticate, authorize(["MANAGER"]), checkExist(Category), uploadImage("categoriesImg"), updateCategory)

module.exports = {
  categoryRouter
};
