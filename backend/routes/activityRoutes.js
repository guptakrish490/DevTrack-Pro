import express from 'express'
import { verifyUser } from '../middlewares/authMiddlewares.js'
import { deleteAllActivities, getAllActivities } from '../controllers/activityControllers.js'

const router = express.Router()

// route for activity retrieval
router.get("/", verifyUser, getAllActivities)

// route for all activities deletion
router.delete("/", verifyUser, deleteAllActivities)

export default router