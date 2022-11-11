import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import TestReducer from '../redux/slice/testSlice';
import AuthReducer from '../redux/slice/authSlice';
export const store = configureStore({
  reducer: {
    test: TestReducer,
    auth: AuthReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
