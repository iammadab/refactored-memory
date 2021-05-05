const User = require("../models/user")

exports.createUser = async (data) => {
  try {
    const newUser = new User(data)
    return await newUser.save()
  } catch (error) {
    return { error: true, code: "ERROR_CREATING_USER" }
  }
}

exports.findUserByEmail = async (email) => {
  try {
    return await User.findOne({ email })
  } catch (error){
    return { error: true, code: "ERROR_FETCHING_USER" }
  }
}
