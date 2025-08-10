import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { charactersApi } from '../api/api';

type Character = {
  id: number;
  name: string;
  photo: string;
  about: string;
};
interface State {
  selected: Record<string, Character>;
}
const initialState: State = {
  selected: {},
};

export const selectedCharacterSlice = createSlice({
  name: 'selectedCharacters',
  initialState,
  reducers: {
    addCharacter: (state, action: PayloadAction<Character>) => {
      const char = action.payload;
      state.selected[char.id] = char;
    },
    removeCharacter: (state, action: PayloadAction<string>) => {
      state.selected = Object.fromEntries(
        Object.entries(state.selected).filter(([key]) => {
          return key !== action.payload;
        })
      );
    },
    clearCharacters: (state) => {
      state.selected = {};
    },
  },
});

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: 'luffy',
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    selectedCharacter: selectedCharacterSlice.reducer,
    [charactersApi.reducerPath]: charactersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(charactersApi.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const { addCharacter, removeCharacter, clearCharacters } =
  selectedCharacterSlice.actions;
export const { setSearchQuery } = searchSlice.actions;
export default store;
