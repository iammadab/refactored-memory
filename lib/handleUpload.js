const path = require("path")
const url = require("url")

const fileService = require("../services/file")

module.exports = async (req, res) => {

  // The file won't be uploaded if it is not an image
  if(!req.file){
    return res.json({
      status: 403,
      code: "FILE_NOT_IMAGE"
    })
  }
  
  const { originalname, size } = req.file

  const uploadPath = req.file.path

  // Remove the base folder
  const dirs = uploadPath.split(path.sep)
  dirs.shift()

  const link = "/" + dirs.join("/")

  // TODO: Attach the id of user that uploaded the file
  const file = await fileService.createFile({
    name: originalname,
    link,
    extension: path.extname(originalname),
    size
  })

  res.json({
    status: 200,
    code: "UPLOAD_SUCCESSFULL",
    fileId: file._id
  })

}
