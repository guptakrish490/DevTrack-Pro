import express from 'express'
import { verifyUser } from '../middlewares/authMiddlewares.js'
import { getProfile, updateProfile } from '../controllers/profileControllers.js'

const router = express.Router()

router.get("/", verifyUser, getProfile)
router.put("/", verifyUser, updateProfile)


export default router