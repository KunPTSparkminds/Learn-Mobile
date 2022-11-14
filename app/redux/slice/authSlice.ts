import {createSlice} from '@reduxjs/toolkit';
import type {RootState} from '../../redux/store';

export type AuthState = {
  user: string;
  isSetupPin: boolean;
  step: number;
};

const initialState: AuthState = {
  user: '',
  isSetupPin: false,
  step: 1,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUpPin: (state, action) => {
      state.isSetupPin = action.payload;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
  },
});
export const {setUser, setUpPin, setStep} = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsSetupPin = (state: RootState) => state.auth.isSetupPin;
export const selectStep = (state: RootState) => state.auth.step;

export default authSlice.reducer;
