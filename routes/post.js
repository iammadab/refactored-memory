const express = require("express")
const postRouter = express.Router()

const { bodyResponder } = require("../lib/adapter")

const postController = require("../controllers/post")

postRouter.post("/", bodyResponder(postController.createPost))

module.exports = postRouter
