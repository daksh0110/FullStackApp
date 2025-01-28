import User from "./user.schema";
import { encryption, decryption } from "../common/services/hashing.bycrypt";
import { generateTokens } from "../common/services/webtoken.jwt.service";
import { createResponse, ErrorResponse, IResponse } from "../common/helper/response.hepler";

/**
 * Registers a new user.
 * @function
 * @param {string} username - The name of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<IResponse | ErrorResponse>} - A promise that resolves to a response object indicating the result of the operation.
 * @throws {Error} - Throws an error if there is an issue with the database or encryption process.
 */
const registerUser = async (username: string, email: string, password: string): Promise<IResponse | ErrorResponse> => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      return {
        success: false,
        error_code: 400,
        message: "User already exists",
        data: null,
      };
    }

    const hashedPassword = await encryption(password);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return createResponse(newUser, "User created successfully");
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        success: false,
        error_code: 500,
        message: error.message,
        data: null,
      };
    }

    return {
      success: false,
      error_code: 500,
      message: "An unknown error occurred",
      data: null,
    };
  }
};

/**
 * Logs in a user.
 * @function
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<IResponse | ErrorResponse>} - A promise that resolves to a response object indicating the result of the login operation.
 * @throws {Error} - Throws an error if there is an issue with the database or decryption process.
 */
const loginUser = async (email: string, password: string): Promise<IResponse | ErrorResponse> => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return {
        success: false,
        error_code: 404,
        message: "User not found",
        data: null,
      };
    }

    const isMatch = await decryption(password, user.password);
    if (!isMatch) {
      return {
        success: false,
        error_code: 401,
        message: "Invalid credentials",
        data: null,
      };
    }

    const { accessToken, refreshToken } = await generateTokens(
      user._id,
      user.email,
      user.username,
      user.role,
      user.walletBalance
    );

    user.refreshToken = refreshToken;
    await user.save();

    return createResponse(
      {
        accessToken,
        refreshToken,
        user: {
          id: user._id,
          name: user.username,
          email: user.email,
          role: user.role,
          walletBalance: user.walletBalance, // Include role in the response
        },
      },
      "Login successful"
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        success: false,
        error_code: 500,
        message: error.message,
        data: null,
      };
    }

    return {
      success: false,
      error_code: 500,
      message: "An unknown error occurred",
      data: null,
    };
  }
};

/**
 * Service for updating the user's wallet balance.
 * 
 * This service handles updating the user's wallet balance by adding or subtracting an amount.
 * 
 * @param {string} userId - The ID of the user whose wallet balance is to be updated.
 * @param {number} amount - The amount to add to the user's wallet balance (can be negative for subtraction).
 * 
 * @returns {Promise<IResponse | ErrorResponse>} - The response object containing the updated wallet balance or an error.
 */
export const updateWallet = async (userId: string, amount: number): Promise<IResponse | ErrorResponse> => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return {
        success: false,
        error_code: 404,
        message: "User not found",
        data: null,
      };
    }

    user.walletBalance += amount; // Update the wallet balance
    await user.save();

    // Return the response using createResponse
    return {
      success: true,
      message: "Wallet updated successfully",
      data: { walletBalance: user.walletBalance },
    };
  } catch (error) {
    return {
      success: false,
      error_code: 500,
      message: "Internal Server Error",
      data: null,
    };
  }
};

/**
 * Get the wallet balance of a user.
 * 
 * This service fetches the wallet balance of a specific user.
 * 
 * @param {string} userId - The ID of the user whose wallet balance is to be fetched.
 * 
 * @returns {Promise<IResponse | ErrorResponse>} - The response object containing the wallet balance or an error.
 */
export const getWalletBalance = async (userId: string): Promise<IResponse | ErrorResponse> => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return {
        success: false,
        error_code: 404,
        message: "User not found",
        data: null,
      }; // ErrorResponse
    }
    return {
      success: true,
      message: "Wallet balance fetched successfully",
      data: { balance: user.walletBalance }, // IResponse
    };
  } catch (error) {
    return {
      success: false,
      error_code: 500,
      message: "An error occurred while fetching wallet balance",
      data: null,
    }; // ErrorResponse
  }
};

export const userservice = {
  registerUser,
  loginUser,
  updateWallet,
  getWalletBalance,
};
