import {
  type Action,
  configureStore,
  type ThunkAction,
} from '@reduxjs/toolkit';
import controlledReducer from './slice/controlledSlice.ts';
import uncontrolledReducer from './slice/uncontrolledSlice.ts';
import countriesSlice from './slice/countriesSlice.ts';

export const store = configureStore({
  reducer: {
    controlled: controlledReducer,
    uncontrolled: uncontrolledReducer,
    countries: countriesSlice,
  },
});

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
