import express from "express"
import dotenv from 'dotenv'
import connectDB from "./configs/db.js"

dotenv.config({path:"../.env"})

const app=express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.send("Backend working")
})


const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})