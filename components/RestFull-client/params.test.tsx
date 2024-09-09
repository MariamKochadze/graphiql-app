import Prams from './params';
import { act, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { describe, it } from 'vitest';
import { renderWithProviders } from '../../utils/test-utils';
import english from '../../messages/en.json';
import { setUser } from '@store/userSlice';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { ResponseState } from '@app/common/interface/interface';
import { setNewResponse } from '@store/features/response/responseSlice';

const responseTest: ResponseState = {
  url: '',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  variables: {
    test: 'test',
  },
  body: '{}',
  response: '',
  status: 0,
  size: 0,
  time: 0,
};

const initialUser = {
  uid: '123',
  displayName: 'John Doe',
  email: 'n9KJn@example.com',
};

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

describe('Params Component', () => {
  it('renders Params component correctly', async () => {
    const { store } = renderWithProviders(<Prams />);
    await act(async () => {
      store.dispatch(setUser(initialUser));
    });
    const state = store.getState();
    expect(state.user.user).toEqual(initialUser);
    expect(screen.getByText(/Params Headers/i)).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Body/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Headers/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Variables/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Headers/i })).toHaveAttribute('aria-selected', 'true');
  });

  it('doesn`t render without user', async () => {
    const { store } = renderWithProviders(<Prams />);
    const state = store.getState();
    expect(state.user.user).not.toEqual(initialUser);
    const paramsHeaders = screen.queryByText(/Params Headers/i);
    const bodyTab = screen.queryByRole('tab', { name: /Body/i });
    const headersTab = screen.queryByRole('tab', { name: /Headers/i });
    const variablesTab = screen.queryByRole('tab', { name: /Variables/i });

    expect(paramsHeaders).toBeNull();
    expect(bodyTab).toBeNull();
    expect(headersTab).toBeNull();
    expect(variablesTab).toBeNull();
  });

  it('user can change tab', async () => {
    const { store } = renderWithProviders(<Prams />);
    await act(async () => {
      store.dispatch(setUser(initialUser));
    });
    const state = store.getState();
    expect(state.user.user).toEqual(initialUser);
    expect(screen.getByText(/Params Headers/i)).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Headers/i })).toHaveAttribute('aria-selected', 'true');
    const bodyTab = screen.getByRole('tab', { name: /Variables/i });
    await userEvent.click(bodyTab);
    expect(screen.getByRole('tab', { name: /Headers/i })).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByRole('tab', { name: /Variables/i })).toHaveAttribute('aria-selected', 'true');
  });

  it('user can change tab', async () => {
    const { store } = renderWithProviders(<Prams />);
    await act(async () => {
      store.dispatch(setUser(initialUser));
    });
    const classText =
      "after:content-[''] after:block after:w-2 after:h-2 after:bg-color-green after:absolute after:top-1 after:right-1 after:rounded-full";
    expect(screen.getByRole('tab', { name: /Headers/i })).not.toHaveClass(classText);
    await act(async () => {
      store.dispatch(setNewResponse(responseTest));
    });
    expect(screen.getByRole('tab', { name: /Headers/i })).toHaveClass(classText);
    expect(screen.getByRole('tab', { name: /Body/i })).toHaveClass(classText);
    expect(screen.getByRole('tab', { name: /Variables/i })).toHaveClass(classText);
    expect(screen.getByText('Variables (1)')).toBeInTheDocument();
    expect(screen.getByText('Headers (1)')).toBeInTheDocument();
  });
});
