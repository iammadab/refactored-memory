const postService = require("../../services/post")

const joi = require("joi")

const fetchPostValidator = joi.object({
  user: joi.object({
    _id: joi.object().required()
  }).required().unknown(true)
}).required().unknown(true)

const fetchAllPost = async (data) => {
  
  const validationResult = fetchPostValidator.validate(data)
  if(validationResult.error)
    return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.error }

  data = validationResult.value

  const posts = await postService.fetchUserPosts(data.user._id)
  if(posts.error)
    return { status: 500, code: posts.code }

  return { status: 200, code: "FETCHED_ALL_POSTS", data: posts }

}

module.exports = fetchAllPost
