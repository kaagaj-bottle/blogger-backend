const Blog = require("../models/blog");
const user = require("../models/user");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

require("express-async-errors");
const blogsRouter = require("express").Router();

const getTokenFrom = (request) => {
  return null;
};

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { blogs: false });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET_STRING);

  if (!decodedToken.id) {
    return response.status(401).json({
      error: "token missing or invalid",
    });
  }

  let user = await User.findById(body.userId);

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });

  if (newBlog.title && newBlog.url) {
    const savedBlog = await newBlog.save();
    user.blogs = user.blogs.concat(savedBlog.id);
    await user.save();
    response.status(201).json([savedBlog]);
  } else {
    response.status(400).end();
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET_STRING);
  if (!decodedToken.id) {
    return response.status(404).json({
      error: "invalid token",
    });
  }
  const blog = await Blog.findById(request.params.id);
  if (blog.user.toString() === decodedToken.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
  }

  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
