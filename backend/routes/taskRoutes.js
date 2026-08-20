import express from 'express'
import { verifyUser } from '../middlewares/authMiddlewares.js'
import { createTasks, deleteTasks, readTasks, updateTasks } from '../controllers/taskControllers.js'

const router = express.Router()

// route for task creation
router.post("/", verifyUser, createTasks)

// route for task retrieval
router.get("/", verifyUser, readTasks)

// route for task updation
router.put("/:id", verifyUser, updateTasks)

// route for task deletion
router.delete("/:id", verifyUser, deleteTasks)


export default router