import express from 'express'
import { verifyUser } from '../middlewares/authMiddlewares.js'
import { createTasks, readTasks } from '../controllers/taskControllers.js'

const router = express.Router()

router.post("/", verifyUser, createTasks)
router.get("/",verifyUser,readTasks)

export default router