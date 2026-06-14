import express from 'express'
import { verifyUser } from '../middlewares/authMiddlewares.js'
import { createTasks, deleteTasks, readTasks, updateTasks } from '../controllers/taskControllers.js'

const router = express.Router()

router.post("/", verifyUser, createTasks)
router.get("/", verifyUser, readTasks)
router.put("/:id", verifyUser, updateTasks)
router.delete("/:id", verifyUser, deleteTasks)


export default router