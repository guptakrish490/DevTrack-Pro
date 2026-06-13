import express from 'express'
import { verifyUser } from '../middlewares/authMiddlewares.js'
import { createProject, getProjects } from '../controllers/projectControllers.js'

const router = express.Router()

router.post("/", verifyUser, createProject)
router.get("/",verifyUser,getProjects)
// router.put("/:id")
// router.delete("/:id")

export default router