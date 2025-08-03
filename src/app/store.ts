import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

type Character = {
  id: string;
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
const selectedCharacterSlice = createSlice({
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
export const store = configureStore({
  reducer: {
    selectedCharacter: selectedCharacterSlice.reducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const { addCharacter, removeCharacter, clearCharacters } =
  selectedCharacterSlice.actions;
export default store;
