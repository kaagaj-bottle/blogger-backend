const mongoose = require("mongoose");
const Blog = require("Blog");

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  passwordHash: String,
  age: Number,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
