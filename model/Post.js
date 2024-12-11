const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user_id:{  type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
    post: {
      type: String,
      required: [true, "please add data"],
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model('posts', postSchema);


module.exports = Post;