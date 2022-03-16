const { Comment } = require("../models");

const express = require("express");
const { createComment, getCommentByProduct, getAllComment } = require("../controllers/comment.controller");
const commentRouter = express.Router();

//form-data categoriesImg
commentRouter.post("/create", createComment);
commentRouter.get("/product/:id", getCommentByProduct);
commentRouter.get("/all-comments", getAllComment);

module.exports = {
  commentRouter
};
