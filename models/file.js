const mongoose = require("mongoose")

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
  extension: { type: String, required: true },
  size: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
})

const fileModel = mongoose.model("File", fileSchema)

module.exports = fileModel
