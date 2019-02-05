const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  twoFA: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String
  },
  avatar: {
    type: String
  },
  status: {
    type: String,
    default: "Hi there, I joined DanGram just now"
  },
  images: {
    type: [String],
    default: []
  },
  content: {
    posts: {
      type: [Schema.Types.ObjectId],
      default: []
    },
    followers: {
      type: [Schema.Types.ObjectId],
      default: []
    },
    following: {
      type: [Schema.Types.ObjectId],
      default: []
    },
    stories: {
      type: [Schema.Types.ObjectId],
      default: []
    }
  }
});

module.exports = model("users", UserSchema);
