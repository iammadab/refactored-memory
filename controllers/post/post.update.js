const postService = require("../../services/post")
const fileService = require("../../services/file")

const joi = require("joi")

const updatePostValidator = joi.object({
  postId: joi.string().trim().required(),
  body: joi.string().trim().required(),
  images: joi.array().items(joi.string()),
  user: joi.object({
    _id: joi.object().required()
  }).required().unknown(true)
}).options({ abortEarly: false }).unknown(true)

const updatePost = async (data) => {
  
  const validationResult = updatePostValidator.validate(data)
  if(validationResult.error)
    return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.error }

  data = validationResult.value

  // Verify that all the files exists
  const files = await fileService.findFiles(data.images)
  if(files.error)
    return { status: 404, code: "COULD_NOT_FIND_IMAGES" }

  const post = await postService.updatePost({
    id: data.postId,
    user: data.user._id,
    body: data.body,
    images: files.map(file => file._id)
  })

  if(post.nModified == 0)
    return { status: 500, code: "FAILED_TO_UPDATE_POST" }

  return { status: 200, code: "UPDATED_POST_SUCCESSFULLY" }

}

module.exports = updatePost
