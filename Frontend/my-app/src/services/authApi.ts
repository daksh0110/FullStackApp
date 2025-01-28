import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * Structure of the login response from the server.
 */
interface AuthResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  };
  message: string;
  success: boolean;
}

/**
 * Structure for the login credentials required to authenticate a user.
 */
interface LoginCredentials {
  email: string;
  password: string;
  role: 'admin' | 'user'; // The role of the user, either 'admin' or 'user'
}

/**
 * Structure for the register credentials required to create a new user.
 */
interface RegisterCredentials {
  email: string;
  password: string;
  username: string;
}

/**
 * Structure for the refresh token response, which contains the new access and refresh tokens.
 */
interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

/**
 * API slice for authentication-related actions such as login, register, and refresh token.
 */
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    /**
     * Login mutation to authenticate the user and get access and refresh tokens.
     * @param {LoginCredentials} credentials - The login credentials (email, password, role).
     * @returns {AuthResponse} The response containing the access token, refresh token, and user data.
     */
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: ({ email, password, role }) => ({
        url: role === 'admin' ? 'admin/login' : 'users/login', // Dynamically set the URL based on the role
        method: 'POST',
        body: { email, password },
      }),
    }),

    /**
     * Register mutation to create a new user.
     * @param {RegisterCredentials} credentials - The registration credentials (email, password, username).
     * @returns {AuthResponse} The response containing the access token, refresh token, and user data.
     */
    register: builder.mutation<AuthResponse, RegisterCredentials>({
      query: (credentials) => ({
        url: 'users/register', // Fixed endpoint for registration
        method: 'POST',
        body: credentials,
      }),
    }),

    /**
     * Refresh token mutation to get a new access token and refresh token.
     * @returns {RefreshTokenResponse} The response containing the new access token and refresh token.
     */
    refreshToken: builder.mutation<RefreshTokenResponse, void>({
      query: () => {
        const token = localStorage.getItem('refreshToken')?.toString();
        return {
          url: 'users/refresh-token',
          method: 'POST',
          body: { refreshToken: token },
        };
      },
    }),
  }),
});

// Export hooks for using the mutations in components
export const { useLoginMutation, useRegisterMutation, useRefreshTokenMutation } = authApi;
