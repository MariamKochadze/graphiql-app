'use client';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleSubmit = () => {
    setFormFields(formFields);
  };

  const handleChange = () => {
    setFormFields(formFields);
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
          fullWidth
          margin="normal"
        />
        <Box className="buttons-container" sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="contained" type="submit">
            Sign In
          </Button>
          <Button variant="outlined">Sign In With Google</Button>
        </Box>
      </form>
    </Box>
  );
};

export default SignInForm;
