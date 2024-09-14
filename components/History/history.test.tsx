import { screen, act } from '@testing-library/react';
import { vi } from 'vitest';
import { describe, it } from 'vitest';
import '@testing-library/jest-dom';
import History from './history';
import { renderWithProviders } from '../../utils/test-utils';
import { setUser } from '@store/userSlice';
import english from '../../messages/en.json';
import { selectUser } from '@store/selectors';

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

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: vi.fn(),
}));

vi.mock('next-intl', () => ({
  useTranslations: (key: string) => (value: string) => english[key][value],
}));

describe('History Component', () => {
  it('renders History component correctly', async () => {
    const { store } = renderWithProviders(<History />);
    await act(async () => {
      store.dispatch(setUser({ uid: '123', displayName: 'John Doe', email: 'n9KJn@example.com' }));
    });
    expect(screen.getByText(/You haven't executed any requests/i)).toBeInTheDocument();
    expect(screen.getByText(english['HomePage']['rest-client'])).toBeInTheDocument();
    expect(screen.getByText(english['HomePage']['graphiql-client'])).toBeInTheDocument();
  });

  it('renders History component correctly', async () => {
    const { store } = renderWithProviders(<History />);
    await act(async () => {
      await store.dispatch(setUser({ uid: '123', displayName: 'John Doe', email: 'n9KJn@example.com' }));
    });
    expect(selectUser(store.getState())).toEqual({ uid: '123', displayName: 'John Doe', email: 'n9KJn@example.com' });
    expect(screen.getByText(english['HomePage']['rest-client'])).toBeInTheDocument();
    expect(screen.getByText(english['HomePage']['graphiql-client'])).toBeInTheDocument();
  });

  it('renders History component correctly', async () => {
    renderWithProviders(<History />);
    expect(screen.getByText(/You haven't executed any requests/i)).toBeInTheDocument();
  });
});
