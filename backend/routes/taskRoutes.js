import express from 'express'
import { verifyUser } from '../middlewares/authMiddlewares.js'
import { createTasks } from '../controllers/taskControllers.js'

const router = express.Router()

router.post("/", verifyUser, createTasks)

export default router