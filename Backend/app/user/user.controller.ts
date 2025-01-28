import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { userservice } from "./user.services";
import { IResponse, ErrorResponse } from "../common/helper/response.hepler";

/**
 * Controller for updating the user's wallet balance.
 * 
 * This controller handles the request to update the user's wallet balance by calling the `updateWallet` service.
 * It sends a response back to the client based on the outcome.
 * 
 * @function
 * @async
 * @param {Request} req - The Express request object, containing user data (userId and amount).
 * @param {Response} res - The Express response object, used to send the response back to the client.
 * 
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */

const wallerController = asyncHandler(async (req: Request, res: Response) => {
  const { userId, amount } = req.body;
  const result: IResponse | ErrorResponse = await userservice.updateWallet(userId, amount);
     
  if ("error_code" in result) {
    res.status(result.error_code).json(result);
  } else {
    res.status(200).json(result);
  } 
}
);


/**
 * Controller for registering a new user.
 * 
 * This controller handles the registration of a new user by accepting user data (username, email, password)
 * and calling the `registerUser` service. It sends a response back to the client based on the outcome.
 * 
 * @function
 * @async
 * @param {Request} req - The Express request object, containing user data (username, email, password).
 * @param {Response} res - The Express response object, used to send the response back to the client.
 * 
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
const registerUserController = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const result: IResponse | ErrorResponse = await userservice.registerUser(username, email, password);

  if ("error_code" in result) {
    res.status(result.error_code).json(result);
  } else {
    res.status(201).json(result);
  }
});

/**
 * Controller for logging in an existing user.
 * 
 * This controller handles the login of an existing user by accepting user credentials (email, password)
 * and calling the `loginUser` service. It sends a response back to the client based on the outcome.
 * 
 * @function
 * @async
 * @param {Request} req - The Express request object, containing user credentials (email, password).
 * @param {Response} res - The Express response object, used to send the response back to the client.
 * 
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
const loginUserController = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result: IResponse | ErrorResponse = await userservice.loginUser(email, password);

  if ("error_code" in result) {
    res.status(result.error_code).json(result);
  } else {
    res.status(200).json(result);
  }
});

/**
 * User controller that exports the register and login controllers.
 * 
 * This module exports the user-related controllers for handling registration and login requests.
 * It includes methods for registering and logging in users.
 * 
 * @module userController
 * @description Contains all the user-related controllers for handling registration and login requests.
 */
/**
 * Controller to fetch the user's wallet balance.
 * 
 * This controller retrieves the wallet balance for a specific user by calling the `getWalletBalance` service.
 * It sends the wallet balance back to the client.
 * 
 * @function
 * @async
 * @param {Request} req - The Express request object, containing the userId as a URL parameter.
 * @param {Response} res - The Express response object, used to send the response back to the client.
 * 
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
const getWalletBalanceController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result: IResponse | ErrorResponse = await userservice.getWalletBalance(id);
  
  if ("error_code" in result) {
    res.status(result.error_code).json(result);
  } else {
    res.status(200).json(result);
  }
});

const userController = {
  registerUserController,
  loginUserController,
  wallerController,
  getWalletBalanceController
};

export default userController;
