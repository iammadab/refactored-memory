const mongoose = require("mongoose")

function connectToDb(){

  const uri = `mongodb+srv://madab:${process.env.DBPASS}@token-cluster.iyehj.mongodb.net/store?retryWrites=true&w=majority`

  return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to online db"))
    .catch(err => console.log("Error connecting to online db", err))

}

module.exports = connectToDb
