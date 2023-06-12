const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utilis/withAuth");

// Create a new user
router.post("/register", async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = userData.id;
      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// existing user login
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    if (!userData) {
      res
        .status(500)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(500)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = userData.id;
      res
        .status(200)
        .json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Render login page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// Logout
router.post("/logout", withAuth, async (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
