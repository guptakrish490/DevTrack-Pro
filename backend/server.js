import express from "express"
import dotenv from 'dotenv'
import connectDB from "./configs/db.js"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js"
import goalRoutes from "./routes/goalRoutes.js"

dotenv.config({path:"../.env"})

const app=express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api/goals",goalRoutes)


const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})