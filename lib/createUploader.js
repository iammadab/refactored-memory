const multer = require("multer")
const path = require("path")

const createUploader = ({ folder }) => {

  const allowedExtensions = [".png", ".jpg", ".jpeg"]
  
  // Store the file to disk based on the folder
  // passed to this function
  const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, folder)
    },
    filename: (req, file, cb) => {
      const extension = path.extname(file.originalname)
      const timestamp = ((new Date()).toISOString()).replace(/:/g, ".")
      const filename = `${timestamp}${extension}`
      cb(null, filename)
    }
  })

  // Only allow images to be uploaded
  const uploader = multer({
    storage: multerStorage,
    fileFilter: (req, file, cb) => {
      const extension = String(path.extname(file.originalname)).toLowerCase()
      if(!allowedExtensions.includes(extension))
        return cb(null, false)
      return cb(null, true)
    }
  })

  return uploader

}

module.exports = createUploader
