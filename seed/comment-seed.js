const { Comment } = require("../models");

const commentData = [
  {
    comment_text: "Great post!",
    user_id: 2,
    blog_id: 1,
  },
  {
    comment_text: "Thanks for sharing.",
    user_id: 1,
    blog_id: 2,
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
