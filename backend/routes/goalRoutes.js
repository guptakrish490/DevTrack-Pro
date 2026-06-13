import express from 'express'
import { verifyUser } from '../middlewares/authMiddlewares.js'
import { createGoal, getGoals, updateGoals } from '../controllers/goalControllers.js'

const router = express.Router()

router.post("/", verifyUser, createGoal)
router.get("/", verifyUser, getGoals)
router.put("/:id", verifyUser, updateGoals)
// router.delete("/:id", verifyUser, delete)

export default router