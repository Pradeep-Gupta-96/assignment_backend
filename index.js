import express from "express";
import cors from 'cors'
import { config } from 'dotenv';
import { connectToDatabase } from './src/config/database.js'
import { route  } from "./src/candidates/candidate.routes.js";
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())



// Load environment variables from config.env file
config({
    path: './src/config/config.env', // Adjust the path as needed
});

connectToDatabase()

app.use("/api", route)
app.use('/uploads', express.static('src/candidates/uploads'));

// app.use("/blog", blogRoute)
// app.use('/uploads', express.static('src/blog_post/uploads'));

app.get('/', (req, res) => {
    res.send("your api is ruuning ....")
})


app.listen(process.env.port, () => {
    console.log(`Server running on port ${process.env.port}`)
})

