import asyncHandler from "express-async-handler";
import { Request, Response ,NextFunction} from "express";
import jwt from "jsonwebtoken";
import { generateTokens } from "../services/webtoken.jwt.service";
import User from "../../user/user.schema";

// Modify the function to work as middleware
export const refreshToken = asyncHandler(async (req: Request, res: Response,next: NextFunction) :Promise<void> => {
  const { refreshToken } = req.body;


  if (!refreshToken) {
     res.status(400).json({ success: false, message: "Refresh token is required" });
    return;
  }

  try {
    const jwtRefreshSecretKey = process.env.JWT_REFRESH_SECRET ?? "";

    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, jwtRefreshSecretKey) as { email: string };

    // Find the user by email and check if the refresh token matches
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
       res.status(403).json({ success: false, message: "Invalid refresh token" });
       return;
    }
      console.log("reached hee")
    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = await generateTokens(user._id, user.email,user.username,user.role,user.walletBalance);

    // Update the refresh token in the database
    user.refreshToken = newRefreshToken;
    await user.save();

    // Send the new tokens in the response
    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
     res.status(403).json({ success: false, message: "Invalid or expired refresh token" });
  }
});
