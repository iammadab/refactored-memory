const createPost = require("./post.create")
const fetchAllPost = require("./post.fetchAll")
const fetchPost = require("./post.fetch")
const deletePost = require("./post.delete")
const updatePost = require("./post.update")

module.exports = {
  createPost,
  fetchAllPost,
  fetchPost,
  deletePost,
  updatePost
}
