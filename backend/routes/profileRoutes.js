import express from 'express'
import { verifyUser } from '../middlewares/authMiddlewares.js'
import { getProfile, updateProfile } from '../controllers/profileControllers.js'
import validate from '../middlewares/validate.js'
import { profileSchema } from '../validators/profile.validator.js'

const router = express.Router()

// route for profile retrieval
router.get("/", verifyUser, getProfile)

// route for profile updation
router.put("/", verifyUser, validate(profileSchema), updateProfile)


export default router