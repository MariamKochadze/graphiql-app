import * as Yup from 'yup';

export const validationSchema = Yup.object({
  displayName: Yup.string().required('Display Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/(?=.*[A-Za-z])/, 'Password must contain at least one letter')
    .matches(/(?=.*\d)/, 'Password must contain at least one digit')
    .matches(/(?=.*[@$!%*?&#])/, 'Password must contain at least one special character'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
});
