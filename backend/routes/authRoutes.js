import express from 'express'
import { loginUser, logoutUser, refreshAccessToken, registerUser } from '../controllers/authControllers.js'

const router = express.Router()

// for user registration route
router.post('/register', registerUser)

// for user login route
router.post('/login', loginUser)

// for logout user route
router.post('/logout',logoutUser)

// for refresh token route
router.post('/refresh',refreshAccessToken)


export default router