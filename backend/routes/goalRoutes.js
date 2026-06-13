import express from 'express'
import { verifyUser } from '../middlewares/authMiddlewares.js'
import { createGoal, deleteGoals, getGoals, updateGoals } from '../controllers/goalControllers.js'

const router = express.Router()

router.post("/", verifyUser, createGoal)
router.get("/", verifyUser, getGoals)
router.put("/:id", verifyUser, updateGoals)
router.delete("/:id", verifyUser, deleteGoals)

export default router