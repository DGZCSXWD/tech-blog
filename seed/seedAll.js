const sequelize = require("../config/connection");
const seedUsers = require("./user-seed");
const seedBlogs = require("./blog-seed");
const seedComments = require("./comment-seed");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  await seedUsers();
  console.log("\n----- USERS SEEDED -----\n");

  await seedBlogs();
  console.log("\n----- BLOGS SEEDED -----\n");

  await seedComments();
  console.log("\n----- COMMENTS SEEDED -----\n");

  process.exit(0);
};

seedAll();
