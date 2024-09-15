import { act, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { describe, it } from 'vitest';
import { renderWithProviders } from '../../utils/test-utils';
import { setUser } from '@store/userSlice';
import '@testing-library/jest-dom';
import { Header } from './Header.component';
import english from '../../messages/en.json';
import { NextIntlClientProvider } from 'next-intl';

const messages = {
  en: english,
  ru: english,
};

vi.mock('next-intl', async importOriginal => {
  const actual = await importOriginal();
  return {
    ...(actual as typeof import('next-intl')),
    useTranslations: (key: string) => (value: string) => english[key][value],
  };
});

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
  getCurrentUser: () => Promise.resolve({ uid: '123', displayName: 'John Doe', email: 'n9KJn@example.com' }),
}));

describe('Header Component', () => {
  it('renders Header component correctly', async () => {
    const { store } = renderWithProviders(
      <NextIntlClientProvider messages={messages} locale={'en'}>
        <Header />
      </NextIntlClientProvider>
    );
    await act(async () => {
      store.dispatch(setUser({ uid: '123', displayName: 'John Doe', email: 'n9KJn@example.com' }));
    });
    const state = store.getState();
    expect(state.user.user).toEqual({ uid: '123', displayName: 'John Doe', email: 'n9KJn@example.com' });
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
