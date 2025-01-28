import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * Ad interface representing the structure of an ad object.
 */
export interface Ad {
  _id: string;
  title: string;
  description: string;
  mediaUrl: string;
  pricePerView: number;
  pricePerClick: number;
  totalViews: number;
  totalClicks: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * User interface representing the structure of a user object.
 * Used for handling the user's wallet balance and role.
 */
export interface User {
  id: string;
  walletBalance: number;
  role: string;
  // Other user properties can be added here
}

/**
 * API slice for managing ads and user wallet updates.
 * Provides endpoints for CRUD operations on ads and updating the user's wallet balance.
 */
export const adsApi = createApi({
  reducerPath: 'adsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken');  // Retrieve token from localStorage
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    /**
     * Fetch all ads.
     * @returns A list of ads.
     */
    getAds: builder.query<Ad[], void>({
      query: () => '/ads/all',
    }),

    /**
     * Create a new ad.
     * @param newAd The ad object to create.
     * @returns The created ad.
     */
    createAd: builder.mutation<Ad, Partial<Ad>>({
      query: (newAd) => ({
        url: 'ads',
        method: 'POST',
        body: newAd,
      }),
    }),

    /**
     * Create a single ad (new route).
     * @param newAd The ad object to create.
     * @returns The created ad.
     */
    createSingleAd: builder.mutation<Ad, Partial<Ad>>({
      query: (newAd) => ({
        url: 'ads/create',  // New route for creating a single ad
        method: 'POST',
        body: newAd,
      }),
    }),

    /**
     * Update an existing ad.
     * @param id The ID of the ad to update.
     * @param updates The updates to apply to the ad.
     * @returns The updated ad.
     */
    updateAd: builder.mutation<Ad, { id: string; updates: Partial<Ad> }>({
      query: ({ id, updates }) => ({
        url: `ads/${id}`,
        method: 'PUT',
        body: updates,
      }),
    }),

    /**
     * Delete an ad.
     * @param id The ID of the ad to delete.
     * @returns A message confirming the deletion.
     */
    deleteAd: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `ads/${id}`,
        method: 'DELETE',
      }),
    }),

    /**
     * Increment the view count for an ad.
     * @param adId The ID of the ad to increment the view count.
     * @returns The updated ad.
     */
    incrementView: builder.mutation<Ad, string>({
      query: (adId) => ({
        url: `ads/view/${adId}`, // Backend should handle this route
        method: 'GET',
      }),
    }),

    /**
     * Increment the click count for an ad.
     * @param adId The ID of the ad to increment the click count.
     * @param userId The ID of the user who clicked the ad.
     * @returns The updated ad.
     */
    incrementClick: builder.mutation<Ad, { adId: string; userId: string }>({
      query: ({ adId, userId }) => ({
        url: `ads/click/${adId}`,  // The adId is passed in the URL
        method: 'POST',  // Use POST to send the userId in the body
        body: { userId },  // Send userId in the request body
      }),
    }),

    /**
     * Update the user's wallet balance after clicking an ad.
     * @param userId The ID of the user whose wallet balance is to be updated.
     * @param amount The amount to update the wallet balance by.
     * @returns The updated user object.
     */
    updateWallet: builder.mutation<User, { userId: string; amount: number }>({
      query: ({ userId, amount }) => ({
        url: `users/wallet`, // Backend should handle this route
        method: 'PUT',
        body: { userId, amount },
      }),
    }),
  }),
});

// Export hooks for components to use
export const { 
  useGetAdsQuery, 
  useCreateAdMutation, 
  useCreateSingleAdMutation, 
  useUpdateAdMutation, 
  useDeleteAdMutation,
  useIncrementViewMutation, 
  useIncrementClickMutation,
  useUpdateWalletMutation  // Export the update wallet mutation
} = adsApi;
