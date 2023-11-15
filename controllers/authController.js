const express = require("express")
const User = require("../models/User")
const router = express.Router()
const bcrypt = require("bcrypt")

// INdex Delete Update Create (Edit) Show

// INDEX
router.post("/login", async (req, res) => {
    try {
        const userToLogin = await User.findOne({ username: req.body.username });

        if (userToLogin) {
            bcrypt.compare(req.body.password, userToLogin.password, (err, result) => {
                if (result) {
                    req.session.userId = userToLogin._id;
                    req.session.name = userToLogin.name;
                    res.status(200).json({ message: "Login successful" });
                } else {
                    res.status(401).json({ error: "Incorrect Password" });
                }
            });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


// CREATE
router.post("/signup", async (req, res) => {
    try {
        if (req.body.username && req.body.password) {
            const plainTextPassword = req.body.password;

            bcrypt.hash(plainTextPassword, 10, async (err, hashedPassword) => {
                if (err) {
                    res.status(500).json({ error: "Password hashing error" });
                } else {
                    req.body.password = hashedPassword;

                    const newUser = await User.create(req.body);

                    if (newUser) {
                        res.status(201).json({ message: "User created successfully" });
                    } else {
                        res.status(500).json({ error: "User creation error" });
                    }
                }
            });
        } else {
            res.status(400).json({ error: "Missing username or password" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


// SHOW
router.get("/:id", async (req, res) => {
    try{
        res.json(await User.findById(req.params.id))
    }catch(error){
        res.status(400).json(error)
    }
})

// DELETE
router.delete("/:id", async (req, res) => {
    try{
        res.json(await User.findByIdAndDelete(req.params.id))
    }catch(error){
        res.status(400).json(error)
    }
})

// Update
router.put("/:id", async (req, res) => {
    try{
        res.json(await User.findByIdAndUpdate(req.params.id, req.body, {new: true}))
    }catch(error){
        res.status(400).json(error)
    }
})

module.exports = router