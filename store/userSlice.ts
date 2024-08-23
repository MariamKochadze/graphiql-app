import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from 'utils/firebase/firebase.utils';

// Define a type for a simplified user object
type SimpleUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
};

type UserState = {
  user: SimpleUser | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
};

export const signUpUser = createAsyncThunk(
  'user/signUpUser',
  async (
    { email, password, displayName }: { email: string; password: string; displayName: string },
    { rejectWithValue }
  ) => {
    try {
      const userAuth = await createAuthUserWithEmailAndPassword(email, password, displayName);

      if (!userAuth) {
        throw new Error('User creation failed.');
      }

      await createUserDocumentFromAuth(userAuth.user, { displayName });

      // Return a simplified user object
      return {
        uid: userAuth.user.uid,
        email: userAuth.user.email,
        displayName: userAuth.user.displayName,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
        ? {
            uid: action.payload.uid,
            email: action.payload.email,
            displayName: action.payload.displayName,
          }
        : null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signUpUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
