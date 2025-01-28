import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the structure of the authentication state
interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

// Initial state for authentication
const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};

// Create the auth slice (reducer)
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set user data and tokens
    setAuthData(state, action: PayloadAction<AuthState>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    // Set loading state
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    // Set error state
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    // Clear authentication data
    clearAuthData(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
    },
    // Handle login success
    loginSuccess(state, action: PayloadAction<{ accessToken: string; refreshToken: string; user: { id: string; name: string; email: string; role: string } }>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.error = null;
      state.loading = false;
    },
    // Handle login failure
    loginFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Export actions from the auth slice
export const { 
  setAuthData, 
  setLoading, 
  setError, 
  clearAuthData, 
  loginSuccess, 
  loginFailure 
} = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
