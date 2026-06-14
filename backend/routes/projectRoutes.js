import express from 'express'
import { verifyUser } from '../middlewares/authMiddlewares.js'
import { createProject, deleteProjects, getProjects, updateProjects } from '../controllers/projectControllers.js'


const router = express.Router()

router.post("/", verifyUser, createProject)
router.get("/", verifyUser, getProjects)
router.put("/:id", verifyUser, updateProjects)
router.delete("/:id", verifyUser, deleteProjects)

export default router