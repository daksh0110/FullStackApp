import { Ad } from "../ads/ads.schema";
import { createResponse } from "../common/helper/response.hepler";
import { generateTokens } from "../common/services/webtoken.jwt.service";
import { Admin } from "./admin.schema";
import bcrypt from "bcrypt";

/**
 * Service for creating a new ad.
 * 
 * This service checks if an ad with the same title already exists. If not, it creates a new ad
 * and saves it to the database.
 * 
 * @param {Object} adData - The ad data to be created.
 * @param {string} adData.title - The title of the ad.
 * @param {string} adData.description - The description of the ad.
 * @param {string} adData.mediaUrl - The media URL of the ad.
 * @param {number} adData.pricePerView - The price per view of the ad.
 * @param {number} adData.pricePerClick - The price per click of the ad.
 * 
 * @returns {Promise<IResponse | ErrorResponse>} The result of the ad creation process.
 */


/**
 * Service for fetching all ads.
 * 
 * This service fetches all ads from the database. If no ads are found, it returns an error.
 * 
 * @returns {Promise<IResponse | ErrorResponse>} The result of fetching all ads.
 */
const getAllAds = async () => {
  try {
    const ads = await Ad.find();
    if (ads.length === 0) {
      return {
        success: false,
        message: "No ads found",
        data: null,
        error_code: 404,
      };
    }
    return createResponse(ads, "Ads fetched successfully");
  } catch (error) {
    const typedError = error as Error;
    return {
      success: false,
      message: typedError.message || "An error occurred",
      data: null,
      error_code: 500,
    };
  }
};

/**
 * Service for logging in an admin.
 * 
 * This service checks if the admin exists, validates the password, generates access and refresh tokens,
 * and returns the login response with tokens and admin details.
 * 
 * @param {Object} loginData - The login credentials of the admin.
 * @param {string} loginData.email - The email of the admin.
 * @param {string} loginData.password - The password of the admin.
 * 
 * @returns {Promise<IResponse | ErrorResponse>} The result of the login process.
 */
export const login = async (loginData: {
    email: string;
    password: string;
    }) => {
    try {
        const admin = await Admin.findOne({ email: loginData.email });
        if (!admin) {
            return {
                success: false,
                message: "Invalid email or password",
                data: null,
                error_code: 401,
            };
        }
        const isPasswordValid = await bcrypt.compare(loginData.password, admin.password);
        if (!isPasswordValid) {
            return {
                success: false,
                message: "Invalid email or password",
                data: null,
                error_code: 401,
            };
        }
        const { accessToken, refreshToken } = await generateTokens(admin._id, admin.email, admin.username, admin.role, null);
        admin.refreshToken = refreshToken;
        await admin.save();
        return createResponse({ accessToken, refreshToken, user: {
          id: admin._id,
          name: admin.username,
          email: admin.email,
          role: admin.role, // Include role in the response
        }, }, "Login successful");
    } catch (error) {
        const typedError = error as Error;
        return {
            success: false,
            message: typedError.message || "An error occurred",
            data: null,
            error_code: 500,
        };
    }
};

/**
 * Service for registering a new admin.
 * 
 * This service checks if an admin with the same email already exists. If not, it hashes the password,
 * creates a new admin, and saves it to the database.
 * 
 * @param {Object} registerData - The registration data for the new admin.
 * @param {string} registerData.username - The username of the admin.
 * @param {string} registerData.email - The email of the admin.
 * @param {string} registerData.password - The password of the admin.
 * 
 * @returns {Promise<IResponse | ErrorResponse>} The result of the registration process.
 */
export const register = async (registerData: { username: string; email: string; password: string; }) => {
    try {
        const admin = await Admin.findOne({ email: registerData.email });
        if (admin) {
            return {
                success: false,
                message: "Admin already exists",
                data: null,
                error_code: 409,
            };
        }
        const hashedPassword = await bcrypt.hash(registerData.password, 10);
        const newAdmin = new Admin({
            ...registerData,
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const savedAdmin = await newAdmin.save();
        return createResponse(savedAdmin, "Admin created successfully");
    } catch (error) {
        const typedError = error as Error;
        return {
            success: false,
            message: typedError.message || "An error occurred",
            data: null,
            error_code: 500,
        };
    }
}

/**
 * Admin service module.
 * 
 * This module groups all the services related to admin actions such as creating ads,
 * fetching ads, logging in, and registering an admin.
 */
export const adminService = {
 
  getAllAds,
  login,
  register
};
