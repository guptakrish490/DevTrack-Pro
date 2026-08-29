import express from 'express'
import { verifyUser } from '../middlewares/authMiddlewares.js'
import { createProject, deleteProjects, getProjects, updateProjects } from '../controllers/projectControllers.js'
import validate from '../middlewares/validate.js'
import { projectPatchSchema, projectSchema } from '../validators/project.validator.js'


const router = express.Router()

// route for project creation
router.post("/", verifyUser, validate(projectSchema), createProject)

// route for project retrieval
router.get("/", verifyUser, getProjects)

// route for project updation
router.put("/:id", verifyUser, validate(projectSchema), updateProjects)

// route forn project partial updation
router.patch("/:id", verifyUser, validate(projectPatchSchema), updateProjects)

// route for project deletion
router.delete("/:id", verifyUser, deleteProjects)

export default router