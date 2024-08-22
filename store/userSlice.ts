import { createSlice } from '@reduxjs/toolkit';
import { UserInfo } from 'firebase/auth';

type UserState = {
  user: UserInfo | null;
};

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
