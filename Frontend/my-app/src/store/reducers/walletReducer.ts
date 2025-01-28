import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WalletState {
  balance: number;
}

const initialState: WalletState = {
  balance: 0,
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    updateWalletBalance: (state, action: PayloadAction<number>) => {
      state.balance += action.payload; // Increment or decrement the balance
    },
  },
});

export const { setWalletBalance, updateWalletBalance } = walletSlice.actions;

export default walletSlice.reducer;
