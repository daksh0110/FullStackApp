import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/**
 * Middleware to verify the token.
 * @param req Request object
 * @param res Response object
 * @param next Next function
 */
export const verifyToken = (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1]; // Get the token from the Authorization header
    const jwtSecretKey = process.env.JWT_SECRET;

    if (!jwtSecretKey) {
        return res.status(500).json({ success: false, message: "JWT secret is not defined in the environment variables" });
    }

    if (!token) {
        return res.status(401).json({ success: false, message: "Authorization token is missing" });
    }

    try {
        // Verify and decode the token
        const decoded: any = jwt.verify(token, jwtSecretKey);

        // Attach userId to req.user
        req.user = { userId: decoded.userId };

        next(); // Proceed to the next middleware or controller
    } catch (error) {
        console.error('Invalid token:', error);
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};
