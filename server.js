require("dotenv").config()
const express = require("express")
const app = express()
const cors = require('cors');
const PORT = process.env.PORT || 7000
const foodController = require("./controllers/foodController")
const authController = require("./controllers/authController")
const orderController = require("./controllers/orderController")
const morgan = require("morgan")
const session = require("express-session");

app.use(express.json())
app.use(cors());
app.use(morgan("tiny"))
app.use(express.urlencoded({extended: true}))
app.use(
    // one hour login time
    session({ secret: "somestringreandomdwd", cookie: { maxAge: 3600000 } })
  );

app.get("/", (req, res) => {
    res.send("Let start it")
})

app.use("/food", foodController)
app.use("/order", orderController)
app.use("/user",authController)

app.listen(PORT, ()=> console.log(PORT, "is real"))