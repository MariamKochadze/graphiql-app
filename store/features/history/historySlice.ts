'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseState } from '@app/common/interface/interface';

const initialState: { [key: string]: ResponseState[] } = {};

const historySlice = createSlice({
  name: 'response',
  initialState,
  reducers: {
    setNewHistory: (state, actions: PayloadAction<{ email: string; response: ResponseState }>) => {
      const { email, response } = actions.payload;
      const history = {
        ...response,
      };
      state[email] = state[email] ? [...state[email], history] : [history];
      localStorage.setItem('historyApiDog', JSON.stringify(state));
    },
    setAllHistory: (_, actions: PayloadAction<{ [key: string]: ResponseState[] }>) => {
      localStorage.setItem('historyApiDog', JSON.stringify(actions.payload));
      return actions.payload;
    },
  },
});

export const { setNewHistory, setAllHistory } = historySlice.actions;
export const historyReducer = historySlice.reducer;
