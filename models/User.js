const mongoose = require("../db/connection");

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,

})

const User = mongoose.model("User", userSchema)

module.exports = User