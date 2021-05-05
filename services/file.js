const File = require("../models/file")

exports.createFile = async (data) => {
  try {
    const newFile = new File(data)
    return await newFile.save()
  } catch (error){
    return { error: true, code: "ERROR_CREATING_FILE" }
  }
}

exports.findFiles = async (ids) => {
  try {
    return await File.find({ _id: { $in: ids } })
  } catch (error){
    return { error: true, code: "ERROR_FINDING_FILES" }
  }
}
