import express from 'express'
import { loginUser, registerUser } from '../controllers/authControllers.js'


const router = express.Router()

//recieves register data and saves it
/* validation middleware
duplicate user middleware
jwt middleware */
router.post('/register', registerUser)

//recieves login data and fetches it
/* validation middleware
jwt token middleware */
router.post('/login', loginUser)



export default router