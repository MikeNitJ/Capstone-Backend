require("dotenv").config()
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URI)

mongoose.connection
  .on("open", () => console.log("Your are connected to mongoose"))
  .on("close", () => console.log("Your are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

module.exports = mongoose