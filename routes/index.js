const express = require("express")
const router = express.Router()

const userRouter = require("./user")

router.use("/user", userRouter)

// Set up upload
const createUploader = require("../lib/createUploader")
const handleUpload = require("../lib/handleUpload")
const upload = createUploader({ folder: "uploads" }).single("image")

router.post("/upload", (req, res) => {
  upload(req, res, err => {
    if(err && err.code == "LIMIT_UNEXPECTED_FILE")
      return res.status(500).json({ code: "IMAGE_FIELD_EXPECTED" })

    handleUpload(req, res)
  })
})

module.exports = router
