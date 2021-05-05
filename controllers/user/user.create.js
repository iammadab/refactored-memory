const argon2 = require("argon2")
const userService = require("../../services/user")

const joi = require("joi")

const createUserValidator = joi.object({
  fullname: joi.string().trim().lowercase().required(),
  email: joi.string().email().trim().lowercase().required(),
  password: joi.string().trim().required()
}).options({ abortEarly: false })

const createUser = async (data) => {
  
  const validationResult = createUserValidator.validate(data)
  if(validationResult.error)
    return { status: 400, code: "BAD_REQUEST_ERROR", errors: validationResult.error }

  const { fullname, email, password } = validationResult.value

  // Make sure no user has that email
  const userWithEmail = await userService.findUserByEmail(email)
  if(userWithEmail){
    return {
      status: 403,
      code: "USER_EXISTS",
      data: "email",
      message: "An account with that email already exists"
    }
  }

  // Hash the password
  const hashedPassword = await argon2.hash(password)

  // Create the user
  const user = await userService.createUser({ fullname, email, password: hashedPassword })
  if(!user || user.error)
    return { status: 500, code: "ERROR_CREATING_USER" }

  return { status: 200, code: "USER_CREATED" }

}

module.exports = createUser
