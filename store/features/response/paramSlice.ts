import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ParamsState } from '@app/common/interface/interface';

const initialState: ParamsState = {
  openPage: 'Headers',
  showVariables: false,
  bodyType: 'json',
};

const paramsSlice = createSlice({
  name: 'params',
  initialState,
  reducers: {
    setOpenParams: (state, actions: PayloadAction<'Headers' | 'Body' | 'Variables'>) => {
      state.openPage = actions.payload;
    },
    setShowVariables: (state, actions: PayloadAction<boolean>) => {
      state.showVariables = actions.payload;
    },

    setBodyType: (state, actions: PayloadAction<'json' | 'text'>) => {
      state.bodyType = actions.payload;
    },
  },
});

export const { setOpenParams, setShowVariables, setBodyType } = paramsSlice.actions;
export const paramsReducer = paramsSlice.reducer;
