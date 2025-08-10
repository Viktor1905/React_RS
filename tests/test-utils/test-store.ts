import { configureStore } from '@reduxjs/toolkit';
import { selectedCharacterSlice } from '../../src/app/store';
import { mockApi } from './mockApi';
import { charactersApi } from '../../src/api/api';

export const createTestStore = () => {
  return configureStore({
    reducer: {
      [charactersApi.reducerPath]: mockApi.reducer,
      selectedCharacter: selectedCharacterSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(mockApi.middleware),
  });
};
