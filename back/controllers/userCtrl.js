const bcrypt = require('bcrypt')
const Users = require('../models/userModel')
const { generateToken } = require('../tokens/generateTokens')

const userCtrl = {
    signUp: async (req, res) => {
        try {
            const { username, email, password } = req.body
            const user = await Users.findOne({ $or: [{ email }, { username }] })

            if(user) return res.status(400).json({error: "This Username already Exists"})

            const passHash = await bcrypt.hash(password, 15)

            const newUser = new Users({
                username,
                email,
                password: passHash
            })

            await newUser.save()

            if(newUser) {
                generateToken(newUser._id, res)
                res.status(201).json({
                    _id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    avatar: newUser.avatar
                })
            } else {
                res.status(400).json({error: "Invalid user data"})
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
            console.log("Error", error.message)
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await Users.findOne({ email })
            const isMatch = await bcrypt.compare(password, user?.password || "")

            if(!user || !isMatch) return res.status(400).json({error: "Invalid Username or Password"})

            generateToken(user._id, res)

            res.status(200).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                avatar: user.avatar
            })
        } catch (error) {
            res.status(500).json({ error: error.message })
            console.log("Error", error.message)
        }
    },
    
}

module.exports = userCtrl