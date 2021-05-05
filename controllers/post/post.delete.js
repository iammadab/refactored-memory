const postService = require("../../services/post")

const joi = require("joi")

const deletePostValidator = joi.object({
  postId: joi.string().required(),
  user: joi.object({
    _id: joi.object().required()
  }).required().unknown(true)
}).required().unknown(true)

const deletePost = async (data) => {
  
  const validationResult = deletePostValidator.validate(data)
  if(validationResult.error)
    return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.error }

  data = validationResult.value

  // TODO: You can only delete your own post
  const post = await postService.deleteUserPost(data.postId, data.user._id)
  if(post.deletedCount == 0)
    return { status: 404, code: "POST_NOT_FOUND" }

  return { status: 200, code: "POST_DELETED" }

}

module.exports = deletePost
