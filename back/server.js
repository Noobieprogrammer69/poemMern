require("dotenv").config()
const express = require("express")
const cookieparser = require("cookie-parser")
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoutes")
const poemRoutes = require("./routes/poemRoutes")
const path = require("path")

const app = express()

app.use(express.json())
app.use(cookieparser())

app.use("/api/users", userRoutes)
app.use("/api/poem", poemRoutes)

const PORT = process.env.PORT || 5000

const connectDB = async () => {
    try {
        const connect = await mongoose.connect("mongodb+srv://jover:kyra@cluster0.jigz3y6.mongodb.net/", {

        })

        console.log(`MongoDb is connected: ${connect.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

connectDB()

// app.get('/', (req, res) => {
//     res.status(200).send("Hello Backend")
// })

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../front/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../front/dist", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})

