import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import crypto from 'crypto'
import RefreshToken from '../models/RefreshToken.js'
import asyncHandler from '../utils/asyncHandler.js'
import AppError from '../utils/AppError.js'

// controller for new user registration
export const registerUser = asyncHandler(async (req, res) => {
    const { name, username, email, password, links, gender, location, bio, avatarURL } = req.body

    const existingUser = await User.findOne({ $or: [{ email }, { username }] })
    if (existingUser) {
        if (existingUser.email === email) {
            throw new AppError("Account with this email already exists!", 409)
        }
        if (existingUser.username === username) {
            throw new AppError("Account with this username already exists!", 409);
        }
    }

    const hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS))
    const newUser = new User({
        name,
        username,
        email,
        password: hash,
        links,
        gender,
        location,
        bio,
        avatarURL
    })

    await newUser.save();

    const accessToken = jwt.sign(
        { id: newUser._id, username, email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
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
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none"
    });

    res.status(201).json({ message: "User created successfully!" });
})

// controller for user login
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        throw new AppError("User not found!", 401)
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new AppError("Invalid email or password, please try again!", 401)
    }

    const accessToken = jwt.sign(
        { id: user._id, username: user.username, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    )

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
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
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })


    res.status(200).json({ message: "LoggedIn successfully" })
})

//controller for user logout
export const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    });

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none"
    });

    const currentRefreshToken = req.cookies.refreshToken;
    const tokenHash = crypto.createHash("sha256").update(currentRefreshToken).digest("hex");
    const deletedToken = await RefreshToken.findOneAndDelete({ tokenHash });

    if (!deletedToken) throw new AppError("Token doesn't exists", 404);
    res.status(200).json({ message: "Logged out successfully!" });

})

//controller for resfresh token
export const refreshAccessToken = asyncHandler(async (req, res) => {
    const oldRefreshToken = req.cookies.refreshToken;

    if (!oldRefreshToken) {
        throw new AppError("Refresh token not found", 404)
    }

    const tokenHash = crypto
        .createHash("sha256")
        .update(oldRefreshToken)
        .digest("hex");



    const storedToken = await RefreshToken.findOne({ tokenHash });

    if (!storedToken) {
        throw new AppError("Invalid Refresh token", 401);
    }

    if (storedToken.revokedAt) {
        throw new AppError("Refresh token has been revoked!", 401);
    }

    if (storedToken.expiresAt < new Date()) {
        throw new AppError("Refresh token has expired!", 401);
    }

    const user = await User.findById(storedToken.user);
    const newAccessToken = jwt.sign(
        { id: user._id, username: user.username, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
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
        sameSite: "none"
    });

    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
        success: true,
        message: "Access token refreshed!"
    })
})