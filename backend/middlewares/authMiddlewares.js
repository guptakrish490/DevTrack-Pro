import jwt from "jsonwebtoken";
import User from "../models/user.js";

// authorization middleware
export const verifyUser = async (req, res, next) => {
    try {
        const decoded = jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id).select("-password")

        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        req.user = user
        next()
    }
    catch (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
}