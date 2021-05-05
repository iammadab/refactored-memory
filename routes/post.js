const express = require("express")
const postRouter = express.Router()

const tokenMiddleware = require("../middlewares/token")

const { bodyResponder } = require("../lib/adapter")

const postController = require("../controllers/post")

postRouter.post(
  "/", 
  tokenMiddleware.validateToken(),
  bodyResponder(postController.createPost)
)

module.exports = postRouter
