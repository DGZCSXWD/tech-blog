const { User } = require("../models");

const userData = [
  {
    username: "JohnDoe",
    password: "password123",
  },
  {
    username: "JaneDoe",
    password: "password456",
  },
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;
