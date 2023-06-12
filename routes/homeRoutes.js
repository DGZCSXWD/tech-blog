const router = require("express").Router();
const { User, Blog, Comment } = require("../models");
const withAuth = require("../utilis/withAuth");

//get all blogs
router.get("/", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render("homepage", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get one blog
router.get("/blog/:id", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
          attributes: ["comment_text"],
        },
      ],
    });

    const blog = blogData.get({ plain: true });
    const isAuthor = blog.user_id === req.session.user_id;

    res.render("blog", {
      ...blog,
      logged_in: req.session.logged_in,
      isAuthor,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
