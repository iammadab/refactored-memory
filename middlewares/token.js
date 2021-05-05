const { promisify } = require("util")
const joi = require("joi")

const verify = promisify(require("jsonwebtoken").verify)
const userService = require("../services/user")

// Decodes and validates the token
// Fetches the user based on token
// Attaches user to request object
// Handle any error that pops up
exports.validateToken = (tokenName = "token") => (req, res, next) => {

  const tokenValidator = joi.object({
    [tokenName]: joi.string().required()
  }).options({ abortEarly: false }).unknown(true)

  const validationResult = tokenValidator.validate(req.body)

  if(validationResult.error)
    return res.status(400).json({
      status: 400,
      code: "BAD_REQUEST_BODY",
      errors: validationResult.error
    })

  verifyToken()
    .then(attachUserInfo)
    .then(next)
    .catch(handleErrors)


  function verifyToken(){
    return verify(req.body[tokenName], process.env.SECRET_KEY)
  }

  async function attachUserInfo(decodedToken){
    const user = await userService.findUserById(decodedToken.id)
    if(!user){
      return res.status(403).json({
        status: 403,
        code: "USER_NOT_FOUND"
      })
    }

    req.body.user = user
  }

  function handleErrors(error){
    if(error.name == "TokenExpiredError")
      res.status(403).json({ code: "TOKEN_EXPIRED" })
    else if(error.name == "JsonWebTokenError")
      res.status(403).json({ code: "TOKEN_INVALID" })
    else
      res.status(400).json({ code: "COULD_NOT_VALIDATE_TOKEN" })
  }

}
