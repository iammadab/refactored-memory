const Post = require("../models/post")

exports.createPost = async (data) => {
  try {
    const newPost = new Post(data)
    return await newPost.save()
  } catch (error){
    return { error: true, code: "ERROR_CREATING_POST" }
  }
}

exports.updatePost = async (data) => {
  try {
    return await Post.updateOne(
      { _id: data.id, user: data.user },
      { body: data.body, images: data.images }
    )
  } catch(error) {
    return { error: true, code: "ERROR_UPDATING_POST" }
  }
}

exports.fetchUserPosts = async (id) => {
  try {
    return await Post.find({ user: id })
  } catch (error) {
    return { error: true, code: "ERROR_FETCHING_USER_POST" }
  }
}

exports.fetchPostById = async (id) => {
  try {
    return await Post.findOne({ _id: id })
  } catch (error){
    return { error: true, code: "ERROR_FETCHING_POST" }
  }
}

exports.deleteUserPost = async (id, userId) => {
  try {
    return await Post.deleteOne({ _id: id, user: userId })
  } catch (error){
    return { error: true, code: "ERROR_DELETING_POST" }
  }
}
