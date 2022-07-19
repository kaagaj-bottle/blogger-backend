const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const { blogs, blogsInDatabase } = require("./test_helper");
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  console.log("cleared");

  blogs.forEach(async (blog) => {
    let blogObject = new Blog(blog);
    await blogObject.save();
    console.log("saved");
  });
  console.log("done");
});

describe("test on database", () => {
  test("blogs are returned as json", async () => {
    api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 1000000);

  test("adding new blog", async () => {
    const newBlog = new Blog({
      title: "Dunno",
      author: "also dunno",
      url: "i don't know",
      likes: 122,
    });

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  }, 1000000);

  test("number of blogs returned is correct", async () => {
    const res = await api.get("/api/blogs");

    expect(res.body).toHaveLength(blogs.length);
  }, 10000000);

  afterAll(() => {
    mongoose.connection.close();
  });
});
