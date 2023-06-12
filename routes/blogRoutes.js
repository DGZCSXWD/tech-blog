const router = require("express").Router();
const { Blog } = require("../models");
const withAuth = require("../utilis/withAuth");

// Create a new blog
router.post("/blog", withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });
    if (!newBlog) {
      res.status(500).json({ message: "Something went wrong!" });
      return;
    }
    res.status(200).json(newBlog);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update a blog
router.put("/blog/:id", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!blogData) {
      res.status(404).json({ message: "No blog found!" });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Delete a blog
router.delete("/blog/:id", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!blogData) {
      res.status(404).json({ message: "No blog found!" });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
