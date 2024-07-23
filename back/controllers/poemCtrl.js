const Poem = require("../models/poemModel")

const poemCtrl = {
    createPoem: async (req, res) => {
        try {
            const { name, contents } = req.body

            if(!name || !contents) return res.status(400).json({error: "Please input all the fields"})
            
            const newPoem = new Poem({ name, contents })

            await newPoem.save()
            res.status(201).json(newPoem)
        } catch (error) {
            res.status(500).json({ error: error.message })
            console.log("Error", error.message)
        }
    },
    getAllPoems: async (req, res) => {
        try {
            const poems = await Poem.find({}).sort({createdAt: -1})

            res.status(200).json(poems)
        } catch (error) {
            res.status(500).json({ error: error.message })
            console.log("Error", error.message)
        }
    }
}

module.exports = poemCtrl