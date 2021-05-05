const File = require("./models/file")

exports.createFile = async (data) => {
  try {
    const newFile = new File(data)
    return await newFile.save()
  } catch (error){
    return { error: true, code: "ERROR_CREATING_FILE" }
  }
}
