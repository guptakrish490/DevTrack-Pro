import express from 'express'
import { verifyUser } from '../middlewares/authMiddlewares.js'
import { createTasks, deleteTasks, readTasks, updateTasks } from '../controllers/taskControllers.js'
import validate from '../middlewares/validate.js'
import { taskPatchSchema, taskSchema } from '../validators/tasks.validator.js'

const router = express.Router()

// route for task creation
router.post("/", verifyUser, validate(taskSchema), createTasks)

// route for task retrieval
router.get("/", verifyUser, readTasks)

// route for task updation
router.put("/:id", verifyUser, validate(taskSchema), updateTasks)

// router for task partial updates
router.patch("/:id", verifyUser, validate(taskPatchSchema), updateTasks)

// route for task deletion
router.delete("/:id", verifyUser, deleteTasks)


export default router