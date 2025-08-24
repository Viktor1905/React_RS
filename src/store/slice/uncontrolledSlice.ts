import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FullSchemaData } from '../../utils/schema/baseSchema';

export type FormData = Omit<FullSchemaData, 'upload file'> & {
  'upload file': {
    base64: string;
    fileName: string;
    fileType: string;
  } | null;
};

const initialState: FormData = {
  name: '',
  age: '',
  email: '',
  gender: null,
  'accept Terms and Conditions': false,
  country: '',
  'upload file': null,
  password: '',
  'password confirmation': '',
};

const uncontrolledSlice = createSlice({
  name: 'controlled',
  initialState,
  reducers: {
    setSubmittedUncontrolledData: (_, action: PayloadAction<FormData>) => {
      return action.payload;
    },
  },
});

export const { setSubmittedUncontrolledData } = uncontrolledSlice.actions;

export default uncontrolledSlice.reducer;
