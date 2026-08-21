import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import crypto from 'crypto'
import RefreshToken from '../models/RefreshToken.js'

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

        const accessToken = jwt.sign(
            { id: newUser._id, username, email },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        )

        const refreshToken = crypto.randomBytes(64).toString("hex");

        const tokenHash = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");

        await RefreshToken.create({
            user: newUser._id,
            tokenHash,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });

        res.status(201).json({ message: "User created successfully!" })
    }
    catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: "Duplicate field value entered", accessToken, refreshToken });
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
            return res.status(400).json({ message: "Invalid email or password, please try again!" })
        }

        const accessToken = jwt.sign(
            { id: user._id, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        )

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });

        const refreshToken = crypto.randomBytes(64).toString("hex");

        const tokenHash = crypto
            .createHash("sha256")
            .update(refreshToken)
            .digest("hex");

        await RefreshToken.create({
            user: user._id,
            tokenHash,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })


        res.status(200).json({ message: "LoggedIn successfully" })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//controller for user logout
export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        });


        res.status(200).json({ message: "Logged out successfully!" });


    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }

}

//controller for resfresh token
export const refreshAccessToken = async (req, res) => {
    try {
        const oldRefreshToken = req.cookies.refreshToken;

        if (!oldRefreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token not found!"
            })
        }

        const tokenHash = crypto
            .createHash("sha256")
            .update(oldRefreshToken)
            .digest("hex");



        const storedToken = await RefreshToken.findOne({ tokenHash });

        if (!storedToken) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token!"
            })
        }

        if (storedToken.revokedAt) {
            return res.status(401).json({
                success: false,
                message: "Refresh token has been revoked!"
            })
        }

        if (storedToken.expiresAt < new Date()) {
            return res.status(401).json({
                success: false,
                message: "Refresh token has expired!"
            })
        }

        const user = await User.findById(storedToken.user);
        const newAccessToken = jwt.sign(
            { id: user._id, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );
        const newRefreshToken = crypto.randomBytes(64).toString("hex");

        const newTokenHash = crypto
            .createHash("sha256")
            .update(newRefreshToken)
            .digest("hex")


        storedToken.revokedAt = new Date();
        await storedToken.save();

        await RefreshToken.create({
            user: storedToken.user,
            tokenHash: newTokenHash,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: "Access token refreshed!",
            accessToken: newAccessToken
        })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}