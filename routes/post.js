const express = require("express")
const postRouter = express.Router()

const tokenMiddleware = require("../middlewares/token")

const { bodyResponder, paramResponder } = require("../lib/adapter")

const postController = require("../controllers/post")

postRouter.post(
  "/", 
  tokenMiddleware.validateToken(),
  bodyResponder(postController.createPost)
)

postRouter.get(
  "/",
  tokenMiddleware.validateToken(),
  bodyResponder(postController.fetchAllPost)
)

postRouter.get(
  "/:postId",
  paramResponder(postController.fetchPost)
)

module.exports = postRouter
