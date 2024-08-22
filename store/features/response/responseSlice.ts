import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseState } from '@app/common/interface/interface';

const initialState: ResponseState = {
  url: '',
  method: 'GET',
  headers: {},
  body: '',
  response: '',
  status: 0,
  size: 0,
  time: 0,
};

const responseSlice = createSlice({
  name: 'response',
  initialState,
  reducers: {
    setNewUrl: (state, actions: PayloadAction<string>) => {
      state.url = actions.payload;
    },
  },
});

export const { setNewUrl } = responseSlice.actions;
export const responseReducer = responseSlice.reducer;
