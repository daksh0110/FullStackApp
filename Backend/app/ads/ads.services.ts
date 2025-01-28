import { Ad } from "../ads/ads.schema"; // Import Ad model
import  User  from "../user/user.schema" // Import User model (for wallet balance)
import { createResponse } from "../common/helper/response.hepler"; // Response helper

/**
 * Service for creating a new ad.
 * 
 * This service handles the creation of a new ad by checking if an ad with the same title
 * already exists. If it does not, a new ad is created with the provided details.
 * 
 * @param {Object} adData - The data for the new ad.
 * @param {string} adData.title - The title of the ad.
 * @param {string} adData.description - The description of the ad.
 * @param {string} adData.mediaUrl - The URL of the media associated with the ad.
 * @param {number} adData.pricePerView - The price per view of the ad.
 * @param {number} adData.pricePerClick - The price per click of the ad.
 * 
 * @returns {Promise<IResponse | ErrorResponse>} A promise that resolves with a success message and the created ad data,
 * or an error message if the ad already exists or an error occurs.
 */
const createAd = async (adData: {
  title: string;
  description: string;
  mediaUrl: string;
  pricePerView: number;
  pricePerClick: number;
}) => {
  try {
    // Check if an ad with the same title already exists
    const existingAd = await Ad.findOne({ title: adData.title });

    if (existingAd) {
      return {
        success: false,
        message: "Ad with this title already exists.",
        data: null,
        error_code: 400, // Bad request
      };
    }

    // Create a new ad if it doesn't exist
    const newAd = new Ad({
      ...adData,
      totalViews: 0,
      totalClicks: 0,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedAd = await newAd.save();
    return createResponse(savedAd, "Ad created successfully");
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
 * Service for viewing an ad (incrementing view count).
 * 
 * This service increments the view count of the specified ad when it is viewed.
 * The ad ID is passed as a parameter.
 * 
 * @param {string} adId - The ID of the ad being viewed.
 * 
 * @returns {Promise<IResponse | ErrorResponse>} A promise that resolves with a success message and the updated ad data,
 * or an error message if the ad is not found or an error occurs.
 */
const viewAd = async (adId: string) => {
  try {
    const ad = await Ad.findById(adId);

    if (!ad) {
      return {
        success: false,
        message: "Ad not found",
        data: null,
        error_code: 404, // Not found
      };
    }

    // Increment the view count
    ad.totalViews += 1;
    await ad.save();

    return createResponse(ad, "Ad view counted successfully");
  } catch (error) {
    const typedError = error as Error;
    return {
      success: false,
      message: typedError.message || "An error occurred",
      data: null,
      error_code: 500, // Internal server error
    };
  }
};

/**
 * Service for clicking an ad (incrementing click count and adding money to the user's wallet).
 * 
 * This service increments the click count of the specified ad and adds money to the user's wallet
 * when the ad is clicked. The ad ID and user ID are passed as parameters.
 * 
 * @param {string} adId - The ID of the ad being clicked.
 * @param {string} userId - The ID of the user clicking the ad.
 * 
 * @returns {Promise<IResponse | ErrorResponse>} A promise that resolves with a success message, the updated wallet balance, and total clicks,
 * or an error message if the ad or user is not found, or if an error occurs.
 */
const clickAd = async (adId: string, userId: string) => {
  try {
    const ad = await Ad.findById(adId);
    const user = await User.findById(userId);

    if (!ad) {
      return {
        success: false,
        message: "Ad not found",
        data: null,
        error_code: 404, // Not found
      };
    }

    if (!user) {
      return {
        success: false,
        message: "User not found",
        data: null,
        error_code: 404, // Not found
      };
    }

    // Increment the click count
    ad.totalClicks += 1;

    // Add money to the user's wallet
    user.walletBalance += ad.pricePerClick;

    await ad.save();
    await user.save();

    return createResponse({ walletBalance: user.walletBalance, totalClicks: ad.totalClicks }, "Ad clicked and money added to wallet");
  } catch (error) {
    const typedError = error as Error;
    return {
      success: false,
      message: typedError.message || "An error occurred",
      data: null,
      error_code: 500, // Internal server error
    };
  }
};

/**
 * Service for fetching all ads.
 * 
 * This service retrieves all ads from the database.
 * 
 * @returns {Promise<IResponse | ErrorResponse>} A promise that resolves with a success message and the list of ads,
 * or an error message if no ads are found or an error occurs.
 */
const getAllAds = async () => {
  try {
    const ads = await Ad.find();
    if (ads.length === 0) {
      return {
        success: false,
        message: "No ads found",
        data: null,
        error_code: 404, // Not found
      };
    }
    return createResponse(ads, "Ads fetched successfully");
  } catch (error) {
    const typedError = error as Error;
    return {
      success: false,
      message: typedError.message || "An error occurred",
      data: null,
      error_code: 500, // Internal server error
    };
  }
};

/**
 * Ad service module.
 * 
 * This module provides services related to ad actions such as viewing and clicking ads.
 * It also handles the creation of new ads and the retrieval of all ads.
 * 
 * @module adService
 * @description Contains the services for creating, viewing, and clicking ads, including handling user wallet balance updates.
 */
export const adService = {
  viewAd,
  clickAd,
  createAd,
  getAllAds
};
