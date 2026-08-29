import express from 'express'
import { verifyUser } from '../middlewares/authMiddlewares.js'
import { createGoal, deleteGoals, getGoals, updateGoals } from '../controllers/goalControllers.js'
import validate from '../middlewares/validate.js'
import { goalsPatchSchema, goalsSchema } from '../validators/goal.validator.js'

const router = express.Router()

// route for goal creation
router.post("/", verifyUser, validate(goalsSchema), createGoal)

// route for goal retrieval
router.get("/", verifyUser, getGoals)

// route for goal updation
router.put("/:id", verifyUser, validate(goalsSchema), updateGoals)

//router for goal completion
router.patch("/:id", verifyUser, validate(goalsPatchSchema), updateGoals)

// route for goal deletion
router.delete("/:id", verifyUser, deleteGoals)

export default router