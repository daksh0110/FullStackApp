import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * API slice for managing wallet-related actions such as updating wallet balance and fetching wallet balance.
 */
export const walletApi = createApi({
  reducerPath: 'walletApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }), // Update with your API base URL
  endpoints: (builder) => ({
    /**
     * Mutation to update the wallet balance for a specific user.
     * @param {Object} param - The parameters for updating the wallet.
     * @param {string} param.userId - The user ID whose wallet balance is to be updated.
     * @param {number} param.amount - The amount to update in the wallet.
     * @returns {Object} The response from the API after updating the wallet.
     */
    updateWallet: builder.mutation({
      query: ({ userId, amount }) => ({
        url: '/users/wallet', // API endpoint to update the wallet balance
        method: 'PUT',
        body: { userId, amount },
      }),
    }),
    
    /**
     * Query to get the wallet balance for a specific user by their ID.
     * @param {string} userId - The user ID whose wallet balance is to be fetched.
     * @returns {Object} The response from the API containing the user's wallet balance.
     */
    getWalletBalance: builder.query({
      query: (userId) => ({
        url: `/users/wallet/${userId}`, // API endpoint to get the wallet balance for a user
        method: 'GET',
      }),
    }),
  }),
});

// Export hooks for using the mutations and queries in components
export const { useUpdateWalletMutation, useGetWalletBalanceQuery } = walletApi;
