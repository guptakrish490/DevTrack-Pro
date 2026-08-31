import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from "./configs/db.js"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js"
import goalRoutes from "./routes/goalRoutes.js"
import projectRoutes from "./routes/projectRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import dashboardRoutes from "./routes/dashboardRoutes.js"
import activityRoutes from "./routes/activityRoutes.js"
import profileRoutes from "./routes/profileRoutes.js"
import errorHandler from "./middlewares/errorHandler.js"
import helmet from 'helmet'
import { authLimiter } from "./middlewares/rateLimiter.js"

dotenv.config({ path: "./.env" })

const app = express()

connectDB()

app.use(helmet());
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
))
app.use(express.json({
    limit: "10kb"
}))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/api/auth", authLimiter, authRoutes)
app.use("/api/goals", goalRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/tasks", taskRoutes)
app.use("/api/activity", activityRoutes)
app.use("/dashboard", dashboardRoutes)
app.use("/profile", profileRoutes)
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok"
    })
})
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    })
})

app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})