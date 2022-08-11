const User = require("../models/user");
require("express-async-errors");
const bcrypt = require("bcrypt");
const Blog = require("../models/blog");
const usersRouter = require("express").Router();

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: true,
    author: true,
    likes: true,
  });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  const doesUserExist = await User.findOne({ username });

  if (doesUserExist) {
    return response.status(400).json({
      error: `${doesUserExist.username} already exists}`,
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

usersRouter.get("/blogs", async (request, response) => {
  const body = request.body;
  const username = body.username;
  const user = await User.findOne({ username });
  const userId = user.id;
  const userBlogs = await Blog.find({ user });
  response.send(userBlogs);
});

module.exports = usersRouter;
