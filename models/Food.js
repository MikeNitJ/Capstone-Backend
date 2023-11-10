const mongoose = require("../db/connection");

const foodSchema = new mongoose.Schema({
    type: String,
    name: String,
    price: Number,
    image: String,

})

const Food = mongoose.model("Food", foodSchema)

module.exports = Food