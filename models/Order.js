const mongoose = require("../db/connection");

const orderSchema = new mongoose.Schema({
    userId: { ref: "User", type: mongoose.Schema.Types.ObjectId},
    foods: [{ ref: "Food", type: mongoose.Schema.Types.ObjectId}],
    total: Number,
    

})

const Order = mongoose.model("Order", orderSchema)

module.exports = Order