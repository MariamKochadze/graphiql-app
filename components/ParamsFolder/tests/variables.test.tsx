import { act, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { describe, it } from 'vitest';
import { renderWithProviders } from '../../../utils/test-utils';
import english from '../../../messages/en.json';
import { setUser } from '@store/userSlice';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Variables from '../variables';
import { setNewResponse } from '@store/features/response/responseSlice';
import { ResponseState } from '@app/common/interface/interface';

vi.mock('next-intl', () => ({
  useTranslations: (key: string) => (value: string) => english[key][value],
}));

const initialState: ResponseState = {
  url: '',
  method: 'GET',
  headers: {},
  variables: {
    testVariable: 'testValue',
  },
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

describe('Variables Component', () => {
  it('renders Variables component correctly', async () => {
    const { store } = renderWithProviders(<Variables />);
    await act(async () => {
      store.dispatch(setUser(initialUser));
    });
    const state = store.getState();
    expect(state.user.user).toEqual(initialUser);
    expect(screen.getByText(/Params Variables/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Value')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Variable')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add/i })).toBeInTheDocument();
  });

  it('show and hide variables', async () => {
    const { store } = renderWithProviders(<Variables />);
    await act(async () => {
      store.dispatch(setUser(initialUser));
      store.dispatch(setNewResponse(initialState));
    });
    const inputVariable = screen.getByPlaceholderText('Variable');
    const inputValue = screen.getByPlaceholderText('Value');
    const button = screen.getByRole('button', { name: /Add/i });
    const user = userEvent.setup();
    await user.type(inputVariable, 'testVariable');
    await user.type(inputValue, 'testValue');
    await user.click(button);
    const switcher = screen.getByRole('checkbox');
    await user.click(switcher);
    expect(switcher).toBeChecked();
    expect(screen.getByRole('cell', { name: /testVariable/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /testValue/i })).toBeInTheDocument();
  });

  it('show and hide variables', async () => {
    const { store } = renderWithProviders(<Variables />);
    await act(async () => {
      store.dispatch(setUser(initialUser));
    });
    const inputVariable = screen.getByPlaceholderText('Variable');
    const inputValue = screen.getByPlaceholderText('Value');
    const button = screen.getByRole('button', { name: /Add/i });
    const user = userEvent.setup();
    await user.type(inputVariable, 'test Variable');
    await user.type(inputValue, 'test Value');
    await user.click(button);
  });

  it('return error if variable exsists', async () => {
    const { store } = renderWithProviders(<Variables />);
    await act(async () => {
      store.dispatch(setUser(initialUser));
      store.dispatch(setNewResponse(initialState));
    });
    const inputVariable = screen.getByPlaceholderText('Variable');
    const inputValue = screen.getByPlaceholderText('Value');
    const button = screen.getByRole('button', { name: /Add/i });
    const user = userEvent.setup();
    await user.type(inputVariable, 'testVariable');
    await user.type(inputValue, 'test Value');
    await user.click(button);
    const switcher = screen.getByRole('checkbox');
    await user.click(switcher);
    expect(screen.getByText(/Variable already exists/i)).toBeInTheDocument();
    const buttonEdit = screen.getByRole('button', { name: /Edit/i });
    await user.click(buttonEdit);
    expect(inputVariable).toHaveAttribute('value', 'testVariable');
    expect(inputValue).toHaveAttribute('value', 'testValue');
    await user.clear(inputVariable);
    await user.type(inputVariable, 'newVariable');
    await user.click(button);
    const buttonCancel = screen.getByRole('button', { name: /Clear/i });
    await user.click(buttonCancel);
  });
});
