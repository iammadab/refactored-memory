const postService = require("../../services/post")
const fileService = require("../../services/file")

const joi = require("joi")

const createPostValidator = joi.object({
  body: joi.string().trim().required(),
  images: joi.array().items(joi.string()),
  user: joi.object({
    _id: joi.object().required()
  }).required().unknown(true)
}).options({ abortEarly: false }).unknown(true)

const createPost = async (data) => {
  
  const validationResult = createPostValidator.validate(data)
  if(validationResult.error)
    return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.error }

  data = validationResult.value

  // Verify that all the files exists
  const files = await fileService.findFiles(data.images)
  if(files.error)
    return { status: 404, code: "COULD_NOT_FIND_IMAGES" }

  const post = await postService.createPost({
    user: data.user._id,
    body: data.body,
    images: files.map(file => file._id)
  })

  if(!post)
    return { status: 500, code: "ERROR_CREATING_POST" }

  return { status: 200, code: "CREATED_POST_SUCCESSFULLY", data: post }

}

module.exports = createPost
