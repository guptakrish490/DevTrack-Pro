import express from 'express'
import { verifyUser } from '../middlewares/authMiddlewares.js'
import { getDashboardData } from '../controllers/dashboardControllers.js'

const router = express.Router()

// route for dashboard data
router.get("/", verifyUser, getDashboardData)

export default router