const { promisify } = require("util")
const joi = require("joi")

const verify = promisify(require("jsonwebtoken").verify)
const userService = require("../services/user")

// Decodes and validates the token
// Fetches the user based on token
// Attaches user to request object
// Handle any error that pops up
exports.validateToken = (store = "body") => (req, res, next) => {

  const tokenHeader = req.headers["authorization"]
  const scheme = "Bearer "

  if(!tokenHeader)
    return res.status(400).json({
      status: 400,
      code: "TOKEN_NOT_FOUND" 
    })

  if(!tokenHeader.startsWith(scheme))
    return res.status(401).json({
      status: 401,
      code: "INVALID_AUTHORIZATION_SCHEME"
    })

  const token = tokenHeader.slice(scheme.length, tokenHeader.length).trimLeft()

  verifyToken()
    .then(attachUserInfo)
    .then(next)
    .catch(handleErrors)


  function verifyToken(){
    return verify(token, process.env.SECRET_KEY)
  }

  async function attachUserInfo(decodedToken){
    const user = await userService.findUserById(decodedToken.id)
    if(!user){
      return res.status(403).json({
        status: 403,
        code: "USER_NOT_FOUND"
      })
    }

    req[store].user = user
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
