import express from 'express'
import { verifyUser } from '../middlewares/authMiddlewares.js'
import { createGoal } from '../controllers/goalControllers.js'

const router=express.Router()

router.post("/",verifyUser,createGoal)
// router.get("/")
// router.put("/:id")
// router.delete("/:id")

export default router