const Blog = require("../models/blog");

const blogsRouter = require("express").Router();

blogsRouter.get("/", (request, response, next) => {
  Blog.find({})
    .then((result) => {
      response.json(result);
    })
    .catch((err) => next(err));
});

blogsRouter.get("/:id", (request, response, next) => {
  Blog.findById(request.params.id)
    .then((result) => {
      if (result) {
        response.json(result);
      } else {
        response.status(404).end();
      }
    })
    .catch((err) => next(err));
});

blogsRouter.post("/", (request, response, next) => {
  const body = request.body;

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  newBlog
    .save()
    .then((result) => {
      response.json(result);
    })
    .catch((err) => next(err));
});

module.exports = blogsRouter;
