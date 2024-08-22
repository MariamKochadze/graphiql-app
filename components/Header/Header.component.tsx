'use client';

import { Button } from '@mui/material';
import { User } from 'firebase/auth';
import { useAppDispatch } from 'hooks/useStoreHooks';
import { useEffect } from 'react';
import { setUser } from 'store/userSlice';
import { onAuthStateChangedListener, signOutUser } from 'utils/firebase/firebase.utils';

export const Header = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user: User | null) => {
      dispatch(setUser(user));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div>
      <h1>Header</h1>
      <Button onClick={signOutUser}>Sign Out</Button>
    </div>
  );
};
