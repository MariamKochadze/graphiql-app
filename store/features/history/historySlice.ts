'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestHistory, ResponseState } from '@app/common/interface/interface';

const initialState: { [key: string]: RequestHistory[] } = localStorage.getItem('historyApiDog')
  ? JSON.parse(localStorage.getItem('historyApiDog') as string)
  : {};

const historySlice = createSlice({
  name: 'response',
  initialState,
  reducers: {
    setNewHistory: (state, actions: PayloadAction<{ email: string; response: ResponseState }>) => {
      const { email, response } = actions.payload;
      const date = new Date();
      const history = {
        ...response,
        date,
      };
      state[email] = state[email] ? [...state[email], history] : [history];
      localStorage.setItem('historyApiDog', JSON.stringify(state));
    },
  },
});

export const { setNewHistory } = historySlice.actions;
export const historyReducer = historySlice.reducer;
