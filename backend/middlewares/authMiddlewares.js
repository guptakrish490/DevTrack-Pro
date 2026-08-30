import jwt from "jsonwebtoken";
import User from "../models/user.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const verifyUser = asyncHandler(async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        throw new AppError("Access token missing!", 401);
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find user
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
        throw new AppError("Unauthorized access, User not found", 401);
    }

    req.user = user;
    next();
});
