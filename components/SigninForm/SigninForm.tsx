'use client';
import { Box, Button, TextField, Typography } from '@mui/material';
import { User } from 'firebase/auth';
import { useAppDispatch } from 'hooks/useStoreHooks';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { setUser } from 'store/userSlice';
import { signInAuthUserWithEmailAndPassword } from 'utils/firebase/firebase.utils';
import { ValidationError } from 'yup';
import { signInValidationSchema } from './validation';

interface SignInFormFields {
  email: string;
  password: string;
}

interface SignInFormErrors {
  email?: string;
  password?: string;
}

const defaultFormFields: SignInFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState<SignInFormFields>(defaultFormFields);
  const [errors, setErrors] = useState<SignInFormErrors>({});
  const { email, password } = formFields;
  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await signInValidationSchema.validate(formFields, { abortEarly: false });
      setErrors({});
      const userCredential = await signInAuthUserWithEmailAndPassword(email, password);

      if (userCredential) {
        const user: User = userCredential.user;

        dispatch(setUser(user));
        router.push('/');
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        const newErrors: SignInFormErrors = {};
        error.inner.forEach(validationError => {
          if (validationError.path) {
            newErrors[validationError.path as keyof SignInFormErrors] = validationError.message;
          }
        });
        setErrors(newErrors);
      } else {
      }
    }
  };

  return (
    <Box className="sign-in-container" sx={{ width: '100%', maxWidth: 360, mx: 'auto', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Already have an account?
      </Typography>
      <Typography variant="body1" gutterBottom>
        Sign in with your email and password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
          error={!!errors.password}
          helperText={errors.password}
          fullWidth
          margin="normal"
        />
        <Box className="buttons-container" sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
            Sign In
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SignInForm;
