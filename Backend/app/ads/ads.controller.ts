import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { adService } from "./ads.services"; 
import { IResponse, ErrorResponse, createResponse } from "../common/helper/response.hepler"; 

/**
 * Controller for creating a new ad.
 * 
 * This controller handles the creation of a new ad by receiving ad details
 * in the request body. It validates that all necessary fields are provided
 * and calls the ad service to create the ad.
 * 
 * @param {Request} req - The request object containing the ad details in the body.
 * @param {Response} res - The response object to send the result.
 * @param {NextFunction} next - The next middleware function.
 * 
 * @returns {Promise<void>} A promise that resolves once the ad creation is processed.
 * If successful, a 201 status code with the created ad details is returned.
 * If any required fields are missing, a 400 status code with an error message is returned.
 */
export const createAdController = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { title, description, mediaUrl, pricePerView, pricePerClick } = req.body;

  if (!title || !description || !mediaUrl || !pricePerView || !pricePerClick) {
     res.status(400).json({ success: false, message: "All fields are required" });
     return;
  }

  const result: IResponse | ErrorResponse = await adService.createAd({
    title,
    description,
    mediaUrl,
    pricePerView,
    pricePerClick,
  });

  if ("error_code" in result) {
    res.status(result.error_code).json(result);
  } else {
    res.status(201).json(result);
  }
});

/**
 * Controller for viewing an ad.
 * 
 * This controller increments the view count of the specified ad when it is viewed.
 * The ad ID is passed as a parameter in the URL.
 * 
 * @param {Request} req - The request object containing the adId as a URL parameter.
 * @param {Response} res - The response object to send the result.
 * @param {NextFunction} next - The next middleware function.
 * 
 * @returns {Promise<void>} A promise that resolves once the ad view is processed.
 * If the ad is found, a 200 status code with the updated ad details is returned.
 * If the ad is not found, a 404 status code with an error message is returned.
 */
export const viewAdController = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { adId } = req.params; // Assuming adId is passed as a parameter in the URL
  
    const result: IResponse | ErrorResponse = await adService.viewAd(adId);
  
    if ("error_code" in result) {
      res.status(result.error_code).json(result);
    } else {
      res.status(200).json(result);
    }
});

/**
 * Controller for clicking an ad.
 * 
 * This controller increments the click count of the specified ad and adds money to the user's wallet
 * when the ad is clicked. The ad ID and user ID are passed in the body of the request.
 * 
 * @param {Request} req - The request object containing the adId and userId in the body.
 * @param {Response} res - The response object to send the result.
 * @param {NextFunction} next - The next middleware function.
 * 
 * @returns {Promise<void>} A promise that resolves once the ad click is processed.
 * If the ad is found, a 200 status code with the updated ad and user wallet balance is returned.
 * If the ad or user is not found, a 404 status code with an error message is returned.
 */
export const clickAdController = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {adId}=req.params;
    const { userId } = req.body;
  
    const result: IResponse | ErrorResponse = await adService.clickAd(adId, userId);
  
    if ("error_code" in result) {
      res.status(result.error_code).json(result);
    } else {
      res.status(200).json(result);
    }
});

/**
 * Controller for fetching all ads.
 * 
 * This controller calls the `adService.getAllAds` method to fetch all ads from the database.
 * 
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object used to send back the list of ads.
 * @param {NextFunction} next - The next middleware function in the stack.
 * 
 * @returns {Promise<void>} A promise that resolves once the ads are fetched.
 * If successful, a 200 status code with the list of ads is returned.
 * If an error occurs, an appropriate error status code is returned.
 */
export const getAllAdsController = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const result: IResponse | ErrorResponse = await adService.getAllAds();

  if ("error_code" in result) {
    res.status(result.error_code).json(result);
  } else {
    res.status(200).json(result);
  }
});

/**
 * Ad controller module.
 * 
 * This module groups all the controllers related to ad actions such as creating,
 * viewing, and clicking ads.
 * 
 * @module adController
 * @description Contains all the ad-related controllers for handling ad creation,
 * viewing, and clicking requests.
 */
export const adController = {
  viewAd: viewAdController,
  clickAd: clickAdController,
  createAd: createAdController,
  getAllAds: getAllAdsController,
};
