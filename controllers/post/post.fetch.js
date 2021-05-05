const postService = require("../../services/post")

const joi = require("joi")

const fetchPostValidator = joi.object({
  postId: joi.string().required(),
}).required().unknown(true)

const fetchPost = async (data) => {
  
  const validationResult = fetchPostValidator.validate(data)
  if(validationResult.error)
    return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.error }

  data = validationResult.value

  const post = await postService.fetchPostById(data.postId)
  if(!post)
    return { status: 404, code: "POST_NOT_FOUND" }

  return { status: 200, code: "FETCHED_POST", data: post }

}

module.exports = fetchPost
