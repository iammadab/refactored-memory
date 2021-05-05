const Post = require("../models/post")

exports.createPost = async (data) => {
  try {
    const newPost = new Post(data)
    return await newPost.save()
  } catch (error){
    return { error: true, code: "ERROR_CREATING_POST" }
  }
}
