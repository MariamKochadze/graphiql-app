import { act, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { describe, it } from 'vitest';
import { renderWithProviders } from '../../utils/test-utils';
import english from '../../messages/en.json';
import { setUser } from '@store/userSlice';
import '@testing-library/jest-dom';
import AboutProject from './AboutProject';

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

describe('AboutProject Component', () => {
  it('renders AboutProject component correctly', async () => {
    const { store } = renderWithProviders(<AboutProject />);
    await act(async () => {
      store.dispatch(setUser({ uid: '123', displayName: 'John Doe', email: 'n9KJn@example.com' }));
    });
    const state = store.getState();
    expect(state.user.user).toEqual({ uid: '123', displayName: 'John Doe', email: 'n9KJn@example.com' });
    expect(screen.getByText(english['HomePage']['aboutProjectTitle'])).toBeInTheDocument();
    expect(screen.getByText(english['HomePage']['aboutProject'])).toBeInTheDocument();
  });
});
