const router = require("express").Router();
const { User, Blog, Comment } = require("../models");
const withAuth = require("../utilis/withAuth");

//get all blogs
router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    console.log("Blog data fetched:", blogData);

    const blogs = blogData.map((blog) => {
      const { id, title, content, user_id, user, createdAt } = blog.get({
        plain: true,
      });

      console.log("User in blog data:", user);

      return {
        id,
        title,
        content,
        user_id,
        usernamee: user.username,
        createdAt: createdAt.toLocaleString("en-AU"),
      };
    });

    console.log("Blogs:", blogs);

    res.render("homepage", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error("An error occurred:", err);
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
          attributes: ["comment_text", "createdAt"], // add createdAt here
        },
      ],
    });

    let blog = blogData.get({ plain: true });

    blog.createdAt = blog.createdAt.toLocaleString("en-AU"); // transform blog date to local string

    blog.comments = blog.comments.map((comment) => {
      const { id, comment_text, user, createdAt } = comment;
      return {
        id,
        comment_text,
        user,
        createdAt: createdAt.toLocaleString("en-AU"),
      };
    });

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
