import Page from './page';
import { act, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { describe, it } from 'vitest';
import { renderWithProviders } from '../../utils/test-utils';
import english from '../../messages/en.json';
import { setUser } from '@store/userSlice';
import '@testing-library/jest-dom';
import { NextIntlClientProvider } from 'next-intl';

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
}));

const messages = {
  en: english,
  ru: english,
};

describe('Page Component', () => {
  it('renders Page component correctly', async () => {
    const { store } = renderWithProviders(
      <NextIntlClientProvider messages={messages} locale={'en'}>
        <Page searchParams={{ page: 'home', query: 'query' }} />
      </NextIntlClientProvider>
    );
    await act(async () => {
      store.dispatch(setUser({ uid: '123', displayName: 'John Doe', email: 'n9KJn@example.com' }));
    });
    const state = store.getState();
    expect(state.user.user).toEqual({ uid: '123', displayName: 'John Doe', email: 'n9KJn@example.com' });
    expect(screen.getByText(english['HomePage']['rest-client'])).toBeInTheDocument();
    expect(screen.getByText(english['HomePage']['graphiql-client'])).toBeInTheDocument();
    expect(screen.getByText(english['HomePage']['history'])).toBeInTheDocument();
    expect(
      screen.getByText(`${english['HomePage']['welcome-back']}, ${state.user.user?.displayName}!`)
    ).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  });
});
