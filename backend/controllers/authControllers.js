import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

// controller for new user registration
export const registerUser = async (req, res) => {
    const { name, username, email, password, linkedinURL, githubURL, gender, location, bio, avatarURL } = req.body

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] })
        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ message: "Account with this email already exists!" })
            }
            if (existingUser.username === username) {
                return res.status(400).json({ message: "Account with this username already exists!" })
            }
        }


        const hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS))
        const newUser = new User({
            name,
            username,
            email,
            password: hash,
            links: [
                { platform: "Github", url: githubURL },
                { platform: "Linked In", url: linkedinURL }
            ],
            gender,
            location,
            bio,
            avatarURL
        })

        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id, username, email },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });

        res.status(201).json({ message: "User created successfully!" })
    }
    catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: "Duplicate field value entered", token });
        }
        res.status(500).json({ error: err.message })
    }
}

// controller for user login
export const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found!" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password, please try again!" })
        }

        const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        )
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });

        res.status(200).json({ message: "LoggedIn successfully" })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//controller for user logout
export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });
        res.status(200).json({message:"Logged out successfully!"});
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
    
}