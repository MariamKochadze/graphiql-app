'use client';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = event => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <Box className="sign-up-container" sx={{ width: '100%', maxWidth: 400, mx: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Don't have an account?
      </Typography>
      <Typography variant="body1" gutterBottom>
        Sign up with your email and password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
          fullWidth
          margin="normal"
        />

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

        <TextField
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
          fullWidth
          margin="normal"
        />

        <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default SignUpForm;
