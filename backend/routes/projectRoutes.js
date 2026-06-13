import express from 'express'
import { verifyUser } from '../middlewares/authMiddlewares.js'
import { createProject } from '../controllers/projectControllers.js'

const router = express.Router()

router.post("/", verifyUser, createProject)
// router.get("/")
// router.put("/:id")
// router.delete("/:id")

export default router