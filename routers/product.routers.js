const { Product } = require("../models");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");
const {checkExist} = require("../middlewares/validations/checkExist");

const express = require("express");
const {createProduct, getAllProduct, updateProduct} = require("../controllers/product.controller")
const {uploadImage} = require("../middlewares/upload/upload-image");

const productRouter = express.Router();

//form-data categoriesImg
productRouter.post("/create", authenticate, authorize(["MANAGER"]), uploadImage("productsImg", "array"), createProduct);
productRouter.get("/all-products", getAllProduct);
productRouter.put("/edit/:id", authenticate, authorize(["MANAGER"]), checkExist(Product),  uploadImage("productsImg", "array"), updateProduct)


module.exports = {
  productRouter
};
