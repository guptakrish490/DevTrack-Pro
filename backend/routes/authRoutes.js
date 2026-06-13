import express from 'express'
import { registerUser } from '../controllers/authControllers.js'


const router=express.Router()

//recieves register data and saves it
/* validation middleware
duplicate user middleware
jwt middleware */
router.post('/register',registerUser)


export default router