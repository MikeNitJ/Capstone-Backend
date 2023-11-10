require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 7000
const foodController = require("./controllers/foodController")
const morgan = require("morgan")

app.use(morgan("tiny"))
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.send("Let start it")
})
app.use("/food", foodController)

app.listen(PORT, ()=> console.log(PORT, "is real"))