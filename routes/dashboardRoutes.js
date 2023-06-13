const router = require("express").Router();
const { User, Blog, Comment } = require("../models");
const withAuth = require("../utilis/withAuth");

//get all user's blogs
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render("dashboard", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//render new blog page
router.get("/dashboard/new", withAuth, async (req, res) => {
  try {
    res.render("new", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//create new blog
router.post("/dashboard/new", withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
