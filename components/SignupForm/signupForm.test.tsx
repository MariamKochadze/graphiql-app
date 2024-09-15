import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import { describe, it } from 'vitest';
import { renderWithProviders } from '../../utils/test-utils';
import english from '../../messages/en.json';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import SignUpForm from './SignupForm';

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

describe('Signup Component', () => {
  it('renders Signup component correctly', async () => {
    renderWithProviders(<SignUpForm />);
    screen.debug();
    expect(screen.getByText(english['Signup']['email'])).toBeInTheDocument();
    expect(screen.getByText(english['Signup']['password'])).toBeInTheDocument();
    expect(screen.getByText(english['Signup']['confirm-password'])).toBeInTheDocument();
    expect(screen.getByText(english['Signup']['signup-text'])).toBeInTheDocument();
    expect(screen.getByText(english['Signup']['sign-up-info'])).toBeInTheDocument();
    expect(screen.getByText(english['Signup']['sign-up'])).toBeInTheDocument();
    expect(screen.getByText(english['Signup']['name'])).toBeInTheDocument();
  });

  it('renders Signup component correctly', async () => {
    renderWithProviders(<SignUpForm />);
    const user = userEvent.setup();
    await user.type(screen.getByRole('textbox', { name: /email/i }), 'n9KJn@example.com');
    await user.type(screen.getByTestId('password'), 'password');
    await user.type(screen.getByTestId('confirm-password'), 'password');
    await user.type(screen.getByRole('textbox', { name: /name/i }), 'John Doe');
    await user.click(screen.getByRole('button'));
  });

  it('renders Signup component correctly', async () => {
    renderWithProviders(<SignUpForm />);
    const user = userEvent.setup();
    await user.type(screen.getByRole('textbox', { name: /email/i }), 'n9KJn');
    await user.type(screen.getByTestId('password'), 'password');
    await user.type(screen.getByTestId('confirm-password'), 'pasord');
    await user.type(screen.getByRole('textbox', { name: /name/i }), 'John Doe');
    await user.click(screen.getByRole('button'));
  });
});
