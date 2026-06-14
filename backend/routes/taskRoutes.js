import express from 'express'
import { verifyUser } from '../middlewares/authMiddlewares.js'
import { createTasks, readTasks, updateTasks } from '../controllers/taskControllers.js'

const router = express.Router()

router.post("/", verifyUser, createTasks)
router.get("/", verifyUser, readTasks)
router.put("/:id", verifyUser, updateTasks)
export default router