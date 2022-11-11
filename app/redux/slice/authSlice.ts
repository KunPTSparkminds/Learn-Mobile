import {createSlice} from '@reduxjs/toolkit';
import type {RootState} from '../../redux/store';

export type AuthState = {
  user: string;
};

const initialState: AuthState = {
  user: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const {setUser} = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
