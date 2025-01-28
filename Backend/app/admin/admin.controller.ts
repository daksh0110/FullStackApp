import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { adminService } from "./admin.service";
import { IResponse, ErrorResponse } from "../common/helper/response.hepler";

/**
 * Controller for creating a new ad.
 * 
 * This controller validates the request body for required fields and 
 * calls the `adminService.createAd` method to create a new ad in the database.
 * 
 * @param {Request} req - The Express request object, containing the ad data in the body.
 * @param {Response} res - The Express response object used to send back the result.
 * @param {NextFunction} next - The next middleware function in the stack.
 * 
 * @returns {void} Sends a JSON response with the created ad or an error message.
 */


/**
 * Controller for fetching all ads.
 * 
 * This controller calls the `adminService.getAllAds` method to fetch all ads from the database.
 * 
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object used to send back the list of ads.
 * @param {NextFunction} next - The next middleware function in the stack.
 * 
 * @returns {void} Sends a JSON response with all ads or an error message.
 */
export const getAllAdsController = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const result: IResponse | ErrorResponse = await adminService.getAllAds();

  if ("error_code" in result) {
    res.status(result.error_code).json(result);
  } else {
    res.status(200).json(result);
  }
});

/**
 * Admin login controller.
 * 
 * This controller validates the login request body for email and password, 
 * and calls the `adminService.login` method to authenticate the admin.
 * 
 * @param {Request} req - The Express request object, containing the admin login credentials.
 * @param {Response} res - The Express response object used to send back the authentication result.
 * @param {NextFunction} next - The next middleware function in the stack.
 * 
 * @returns {void} Sends a JSON response with the login result or an error message.
 */
export const adminLoginController = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        res.status(400).json({ success: false, message: "All fields are required" });
        return;
    }
    
    const result: IResponse | ErrorResponse = await adminService.login({
        email,
        password,
    });
    
    if ("error_code" in result) {
        res.status(result.error_code).json(result);
    } else {
        res.status(200).json(result);
    }
});

/**
 * Admin register controller.
 * 
 * This controller validates the registration request body for username, email, and password,
 * and calls the `adminService.register` method to register a new admin.
 * 
 * @param {Request} req - The Express request object, containing the admin registration details.
 * @param {Response} res - The Express response object used to send back the registration result.
 * @param {NextFunction} next - The next middleware function in the stack.
 * 
 * @returns {void} Sends a JSON response with the registration result or an error message.
 */
export const adminRegisterController = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username,email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400).json({ success: false, message: "All fields are required" });
        return;
    }

    const result: IResponse | ErrorResponse = await adminService.register({
        username,
        email,
        password,
    });

    if ("error_code" in result) {
        res.status(result.error_code).json(result);
    } else {
        res.status(200).json(result);
    }
});
    
/**
 * Admin controller module.
 * 
 * This module groups all admin-related controller functions, including creating ads,
 * fetching all ads, admin login, and admin registration.
 * 
 * @module adminController
 * @description Contains the controllers for managing ads and admin-related actions such as login and registration.
 */
export const adminController = {
  
  getAllAds: getAllAdsController,
  adminLogin: adminLoginController,
  adminRegister: adminRegisterController,
};
