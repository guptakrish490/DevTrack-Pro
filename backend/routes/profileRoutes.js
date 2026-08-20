import express from 'express'
import { verifyUser } from '../middlewares/authMiddlewares.js'
import { getProfile, updateProfile } from '../controllers/profileControllers.js'

const router = express.Router()

// route for profile retrieval
router.get("/", verifyUser, getProfile)

// route for profile updation
router.put("/", verifyUser, updateProfile)


export default router