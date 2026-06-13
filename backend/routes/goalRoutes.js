import express from 'express'
import { verifyUser } from '../middlewares/authMiddlewares.js'
import { createGoal, getGoals } from '../controllers/goalControllers.js'

const router=express.Router()

router.post("/",verifyUser,createGoal)
router.get("/",verifyUser,getGoals)
// router.put("/:id")
// router.delete("/:id")

export default router