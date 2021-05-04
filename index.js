const express = require("express")
const bodyParser = require("body-parser")
const morgan = require("morgan")

const PORT = process.env.PORT || 4000

const app = express()

app.use(morgan("tiny"))
app.use(bodyParser.json())

// routes
const apiRouter = require("./routes")

app.use("/api", apiRouter)

app.listen(PORT, () => {
  console.log(`Application listening at port ${PORT}`)
})
