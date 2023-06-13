const router = require("express").Router();

const userRoutes = require("./userRoutes");
const blogRoutes = require("./blogRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const homeRoutes = require("./homeRoutes");

router.use(userRoutes);
router.use(blogRoutes);
router.use(dashboardRoutes);
router.use(homeRoutes);

module.exports = router;
