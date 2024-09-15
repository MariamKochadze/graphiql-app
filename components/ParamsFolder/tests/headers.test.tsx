import { act, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { describe, it } from 'vitest';
import { renderWithProviders } from '../../../utils/test-utils';
import english from '../../../messages/en.json';
import { setUser } from '@store/userSlice';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Headers from '../headers';
import { setNewResponse } from '@store/features/response/responseSlice';

vi.mock('next-intl', () => ({
  useTranslations: (key: string) => (value: string) => english[key][value],
}));

const initialState = {
  url: '',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  variables: {},
  body: '',
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

vi.mock('../../../utils/firebase/firebase.utils', () => ({
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

describe('Headers Component', () => {
  it('renders Headers component correctly', async () => {
    const { store } = renderWithProviders(<Headers />);
    await act(async () => {
      store.dispatch(setUser(initialUser));
    });
    const state = store.getState();
    expect(state.user.user).toEqual(initialUser);
    expect(screen.getByText(/Params Headers/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Value')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Key')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add/i })).toBeInTheDocument();
  });

  it('show and hide keys', async () => {
    const { store } = renderWithProviders(<Headers />);
    await act(async () => {
      store.dispatch(setUser(initialUser));
      store.dispatch(setNewResponse(initialState));
    });
    const inputKey = screen.getByPlaceholderText('Value');
    const inputValue = screen.getByPlaceholderText('Key');
    const button = screen.getByRole('button', { name: /Add/i });
    const user = userEvent.setup();
    await user.type(inputKey, 'Authorization');
    await user.type(inputValue, 'test Value');
    await user.click(button);
    expect(screen.getByRole('cell', { name: /Content-Type/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'application/json' })).toBeInTheDocument();
    await act(async () => {
      store.dispatch(setNewResponse({ ...initialState, headers: { Authorization: 'test Value' } }));
    });
    expect(screen.getByRole('cell', { name: /Authorization/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'test Value' })).toBeInTheDocument();
  });

  it('return error if key exsists', async () => {
    const { store } = renderWithProviders(<Headers />);
    await act(async () => {
      store.dispatch(setUser(initialUser));
      store.dispatch(setNewResponse(initialState));
    });
    const inputKey = screen.getByPlaceholderText('Key');
    const inputValue = screen.getByPlaceholderText('Value');
    const button = screen.getByRole('button', { name: /Add/i });
    const user = userEvent.setup();
    await user.type(inputKey, 'Content-Type');
    await user.type(inputValue, 'test Value');
    await user.click(button);
    expect(screen.getByText(/already exists/i)).toBeInTheDocument();
    const buttonEdit = screen.getByRole('button', { name: /Edit/i });
    await user.click(buttonEdit);
    expect(inputKey).toHaveAttribute('value', 'Content-Type');
    expect(inputValue).toHaveAttribute('value', 'application/json');
    await user.clear(inputKey);
    await user.type(inputKey, 'Authorization');
    await user.click(button);
    const buttonCancel = screen.getByRole('button', { name: /Clear/i });
    await user.click(buttonCancel);
  });
});
