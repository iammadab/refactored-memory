require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const morgan = require("morgan")

const connectToDb = require("./runners/database_runner")

const PORT = process.env.PORT || 4000

const app = express()

app.use(morgan("tiny"))
app.use(bodyParser.json())

// routes
const apiRouter = require("./routes")

app.use("/api", apiRouter)


connectToDb()
  .then(startServer)

function startServer(){
  app.listen(PORT, () => {
    console.log(`Application listening at port ${PORT}`)
  })
}
