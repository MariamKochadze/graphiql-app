import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { describe, it } from 'vitest';
import { renderWithProviders } from '../../utils/test-utils';
import english from '../../messages/en.json';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import SignInForm from './SigninForm';

vi.mock('next-intl', () => ({
  useTranslations: (key: string) => (value: string) => english[key][value],
}));

vi.mock('../../utils/firebase/firebase.utils', () => ({
  createAuthUserWithEmailAndPassword: () =>
    Promise.resolve({
      user: {
        uid: '12345',
        email: 'test@example.com',
        displayName: 'John Doe',
      },
    }),
  createUserDocumentFromAuth: () => Promise.resolve(),
}));

vi.mock('next-intl', async importOriginal => {
  const actual = await importOriginal();
  return {
    ...(actual as typeof import('next-intl')),
    useTranslations: (key: string) => (value: string) => english[key][value],
  };
});

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
  }),
}));

describe('SigninForm Component', () => {
  it('renders SigninForm component correctly', async () => {
    renderWithProviders(<SignInForm />);
    expect(screen.getByText(english['Signin']['email'])).toBeInTheDocument();
    expect(screen.getByText(english['Signin']['password'])).toBeInTheDocument();
    expect(screen.getByText(english['Signin']['sign-in'])).toBeInTheDocument();
    expect(screen.getByText(english['Signin']['sign-in-text'])).toBeInTheDocument();
    expect(screen.getByText(english['Signin']['sign-in-info'])).toBeInTheDocument();
  });

  it('renders SigninForm component correctly', async () => {
    renderWithProviders(<SignInForm />);
    const user = userEvent.setup();
    await user.type(screen.getByRole('textbox', { name: /email/i }), 'n9KJn@example.com');
    await user.type(screen.getByTestId('password'), 'password');
    await user.click(screen.getByRole('button'));
  });

  it('renders SigninForm component correctly', async () => {
    renderWithProviders(<SignInForm />);
    const user = userEvent.setup();
    await user.type(screen.getByRole('textbox', { name: /email/i }), 'n9KJn@example.com');
    await user.type(screen.getByTestId('password'), 'password');
    await user.click(screen.getByRole('button'));
  });

  it('renders SigninForm component correctly', async () => {
    renderWithProviders(<SignInForm />);
    const user = userEvent.setup();
    await user.type(screen.getByRole('textbox', { name: /email/i }), 'n9KJn@example.com');
    await user.type(screen.getByTestId('password'), 'Password1!234@');
    await user.click(screen.getByRole('button'));
  });
});
