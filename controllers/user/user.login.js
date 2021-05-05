const argon2 = require("argon2")
const jwt = require("jsonwebtoken")
const joi = require("joi")

const userService = require("../../services/user")

const loginUserValidator = joi.object({
  email: joi.string().email().trim().lowercase().required(),
  password: joi.string().trim().required()
}).options({ abortEarly: false })

const loginUser = async (data) => {

  const validationResult = loginUserValidator.validate(data)
  if(validationResult.error)
    return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.error }

  const { email, password } = validationResult.value

  // Fetch the user by email
  const user = await userService.findUserByEmail(email)
  console.log(user)
  console.log(user.password)
  if(!user)
    return { status: 403, code: "USER_NOT_FOUND" }

  // Make sure the password match
  const samePassword = await argon2.verify(user.password, password)
  if(!samePassword)
    return { status: 403, code: "INVALID_PASSWORD" }

  // Sign a token for the user
  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" })

  return { status: 200, code: "USER_LOGGED_IN", token }

}

module.exports = loginUser
