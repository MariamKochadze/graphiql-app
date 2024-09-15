import { ResponseState } from '@app/common/interface/interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ResponseState = {
  url: '',
  method: 'GET',
  headers: {},
  variables: {},
  body: '',
  response: '',
  status: 0,
  size: 0,
  time: 0,
  urlSdl: '',
  clientType: 'rest',
};

const responseSlice = createSlice({
  name: 'response',
  initialState,
  reducers: {
    setNewUrl: (state, actions: PayloadAction<string>) => {
      state.url = actions.payload;
    },

    setNewBody: (state, actions: PayloadAction<string>) => {
      state.body = actions.payload;
    },

    setNewResponse: (state, actions: PayloadAction<object>) => {
      Object.entries(actions.payload).forEach(([key, value]) => {
        state[key] = value;
      });
    },
  },
});

export const { setNewUrl, setNewBody, setNewResponse } = responseSlice.actions;
export const responseReducer = responseSlice.reducer;
