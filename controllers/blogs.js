const Blog = require("../models/blog");

const blogsRouter = require("express").Router();

blogsRouter.get("/", (request, response, next) => {
  Blog.find({})
    .then((result) => {
      response.json(result);
    })
    .catch((err) => next(err));
});

module.exports = blogsRouter;
