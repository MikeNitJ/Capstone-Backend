const express = require("express")
const Food = require("../models/Food")
const router = express.Router()

// INdex Delete Update Create (Edit) Show

// INDEX
router.get("/", async (req, res) => {
    try{
        res.json(await Food.find())
        
    }catch(error){
        res.status(400).json(error)
    }
})

// CREATE
router.post("/", async (req, res) =>{
    try {
        res.json( await Food.create(req.body))
    }catch (error){
        res.status(400).json(error)
    }
})
// SHOW
router.get("/:id", async (req, res) => {
    try{
        res.json(await Food.findById(req.params.id))
    }catch(error){
        res.status(400).json(error)
    }
})

// DELETE
router.delete("/:id", async (req, res) => {
    try{
        res.json(await Food.findByIdAndDelete(req.params.id))
    }catch(error){
        res.status(400).json(error)
    }
})

// Update
router.put("/:id", async (req, res) => {
    try{
        res.json(await Food.findByIdAndUpdate(req.params.id, req.body, {new: true}))
    }catch(error){
        res.status(400).json(error)
    }
})

module.exports = router