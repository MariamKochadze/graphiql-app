'use client';
import { useAppDispatch } from '@hooks/useStoreHooks';
import { Box, Button, TextField, Typography } from '@mui/material';
import { setUser } from '@store/userSlice';
import { User, UserCredential } from 'firebase/auth';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from 'utils/firebase/firebase.utils';
import { ValidationError } from 'yup';
import { validationSchema } from './validation';

interface FormFields {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  displayName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

const defaultFormFields: FormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState<FormFields>(defaultFormFields);
  const [errors, setErrors] = useState<FormErrors>({});
  const { displayName, email, password, confirmPassword } = formFields;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const t = useTranslations('Signup');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await validationSchema.validate(formFields, { abortEarly: false });
      setErrors({});
      const userCredentials: UserCredential | undefined = await createAuthUserWithEmailAndPassword(
        email,
        password,
        displayName
      );

      if (userCredentials) {
        const user: User = userCredentials.user;
        await createUserDocumentFromAuth(user, { displayName });

        dispatch(setUser(user));
        router.push('/');
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        const newErrors: FormErrors = {};
        error.inner.forEach(validationError => {
          if (validationError.path) {
            newErrors[validationError.path as keyof FormErrors] = validationError.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <Box className="sign-up-container" sx={{ width: '100%', maxWidth: 400, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {t('signup-text')}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {t('sign-up-info')}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label={t('name')}
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
          error={!!errors.displayName}
          helperText={errors.displayName}
          fullWidth
          margin="normal"
        />

        <TextField
          label={t('email')}
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
          label={t('password')}
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

        <TextField
          label={t('confirm-password')}
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          fullWidth
          margin="normal"
        />

        <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
          {t('sign-up')}
        </Button>
      </form>
    </Box>
  );
};

export default SignUpForm;
