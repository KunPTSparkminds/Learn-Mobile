import {createSlice} from '@reduxjs/toolkit';
import type {RootState} from '../../redux/store';

export type TestState = {
  value: number;
};

const initialState: TestState = {
  value: 0,
};

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setValue: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const {setValue} = testSlice.actions;

export const selectValue = (state: RootState) => state.test.value;
export default testSlice.reducer;
