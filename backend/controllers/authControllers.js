import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const registerUser=async(req,res)=>{
    const {name, username, email, password, leetcodeURL, githubURL, bio, avatarURL}=req.body

    //duplicate user middleware
    //validation middleware
    //jwt middleware

    try{
        if(password.length<6 || username.length<3){
            return res.status(400).json({message:"credentials too small!!!"})
        }

        const hash=await bcrypt.hash(password,parseInt(process.env.BCRYPT_SALT_ROUNDS))
        const newUser=new User({name,username,email,password:hash,leetcodeURL,githubURL,bio,avatarURL})

        await newUser.save();
        res.status(201).json({message:"User created successfully"})
    } 
    catch(err){
        res.status(500).json({ error: err.message })
    }
}