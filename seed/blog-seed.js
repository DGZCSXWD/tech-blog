const { Blog } = require("../models");

const blogData = [
  {
    title: "First Blog Post",
    content: "This is the content of my first blog post.",
    user_id: 1,
  },
  {
    title: "Second Blog Post",
    content: "This is the content of my second blog post.",
    user_id: 2,
  },
];

const seedBlogs = () => Blog.bulkCreate(blogData);

module.exports = seedBlogs;
