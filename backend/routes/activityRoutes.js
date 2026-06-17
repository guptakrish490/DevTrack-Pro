import express from 'express'
import { verifyUser } from '../middlewares/authMiddlewares.js'
import { deleteAllActivities, getAllActivities, getUniqueActivity } from '../controllers/activityControllers.js'

const router = express.Router()

router.get("/", verifyUser, getAllActivities)
router.get("/:id", verifyUser, getUniqueActivity,)
router.delete("/", verifyUser, deleteAllActivities)

export default router