import express from 'express'
import { verifyUser } from '../middlewares/authMiddlewares.js'
import { createProject, deleteProjects, getProjects, updateProjects } from '../controllers/projectControllers.js'


const router = express.Router()

// route for project creation
router.post("/", verifyUser, createProject)

// route for project retrieval
router.get("/", verifyUser, getProjects)

// route for project updation
router.put("/:id", verifyUser, updateProjects)

// route for project deletion
router.delete("/:id", verifyUser, deleteProjects)

export default router