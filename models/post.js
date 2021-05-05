const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
  user: { type: "ObjectId", ref: "User" },
  body: { type: String, required: true },
  images: [{ type: "ObjectId", ref: "File" }],
  createdAt: { type: Date, default: Date.now }
})

const postModel = mongoose.model("Post", postSchema)

module.exports = postModel
