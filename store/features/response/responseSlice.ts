import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseState } from '@app/common/interface/interface';

const initialState: ResponseState = {
  url: '',
  method: 'GET',
  headers: {},
  query: {},
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
    setNewMethod: (state, actions: PayloadAction<string>) => {
      state.method = actions.payload;
    },
    setNewHeaders: (state, actions: PayloadAction<Record<string, string>>) => {
      state.headers[actions.payload.key] = actions.payload.value;
    },
    deleteNewHeaders: (state, actions: PayloadAction<string>) => {
      delete state.headers[actions.payload];
    },

    setNewQuery: (state, actions: PayloadAction<Record<string, string>>) => {
      state.query[actions.payload.key] = actions.payload.value;
    },
    deleteQuery: (state, actions: PayloadAction<string>) => {
      delete state.query[actions.payload];
    },

    setNewBody: (state, actions: PayloadAction<string>) => {
      state.body = actions.payload;
    },
  },
});

export const { setNewUrl, setNewHeaders, deleteNewHeaders, setNewQuery, deleteQuery, setNewMethod, setNewBody } =
  responseSlice.actions;
export const responseReducer = responseSlice.reducer;
