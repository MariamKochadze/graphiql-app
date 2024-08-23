'use client';
import SignInForm from '@components/SigninForm/SigninForm';
import SignUpForm from '@components/SignupForm/SignupForm';
import { Box, Grid } from '@mui/material';
import { useAppSelector } from 'hooks/useStoreHooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { selectUser } from 'store/selectors';

export default function Authentication() {
  const user = useAppSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={6}>
          <SignInForm />
        </Grid>
        <Grid item xs={12} md={6}>
          <SignUpForm />
        </Grid>
      </Grid>
    </Box>
  );
}
