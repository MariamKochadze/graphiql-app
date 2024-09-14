import { screen, act } from '@testing-library/react';
import { vi } from 'vitest';
import { describe, it } from 'vitest';
import '@testing-library/jest-dom';
import { renderWithProviders } from '../../utils/test-utils';
import { setUser } from '@store/userSlice';
import english from '../../messages/en.json';
import { setAllHistory } from '@store/features/history/historySlice';
import AllHistory from './allHistory';
import userEvent from '@testing-library/user-event';

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
  usePathname: () => '/en',
}));

vi.mock('next-intl', () => ({
  useTranslations: (key: string) => (value: string) => english[key][value],
}));

describe('AllHistory Component', () => {
  it('renders AllHistory component correctly', async () => {
    const { store } = renderWithProviders(<AllHistory />);
    await act(async () => {
      await store.dispatch(setUser({ uid: '123', displayName: 'John Doe', email: 'hello' }));
      await store.dispatch(
        setAllHistory({
          hello: [
            {
              url: 'http://localhost:3000/api/graphql',
              method: 'GET',
              headers: {},
              variables: {},
              body: '',
              response: '',
              status: 0,
              size: 0,
              time: 0,
              urlSdl: '',
              clientType: 'rest',
            },
          ],
        })
      );
    });
    expect(screen.getByText(english.History.historyRequest)).toBeInTheDocument();
    expect(screen.getByText(/get/i)).toBeInTheDocument();
    expect(screen.getByText(/http:\/\/localhost:3000\/api\/graphql/i)).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(screen.getByText(/http:\/\/localhost:3000\/api\/graphql/i));
  });
});
