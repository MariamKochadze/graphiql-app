import { act, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { describe, it } from 'vitest';
import { renderWithProviders } from '../../utils/test-utils';
import english from '../../messages/en.json';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { ResponseState } from '@app/common/interface/interface';
import { setNewResponse } from '@store/features/response/responseSlice';
import InputEditor from './InputEditor';

const responseTest: ResponseState = {
  url: 'https://jsonplaceholder.typicode.com/posts',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  variables: {
    test: 'test',
  },
  body: JSON.stringify({
    body: 'hello world!',
  }),
  response: '',
  status: 0,
  size: 0,
  time: 0,
  urlSdl: '',
  clientType: 'rest',
};

const responseTest2: ResponseState = {
  url: 'https://jsonplaceholder.typicode.com/posts/100',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  variables: {
    test: 'test',
  },
  body: JSON.stringify({
    body: 'hello world!',
  }),
  response: '',
  status: 0,
  size: 0,
  time: 0,
  urlSdl: '',
  clientType: 'rest',
};

const responseTest3: ResponseState = {
  url: 'https://jsonplaceholder.typicode.com/posts/graphql',
  method: 'GRAPHQL',
  headers: {
    'Content-Type': 'application/json',
  },
  variables: {
    test: 'test',
  },
  body: JSON.stringify({
    body: 'hello world!',
  }),
  response: '',
  status: 0,
  size: 0,
  time: 0,
  urlSdl: '',
  clientType: 'graphql',
};

const initialUser = {
  uid: '123',
  displayName: 'John Doe',
  email: 'n9KJn@example.com',
};

vi.mock('next-intl', () => ({
  useTranslations: (key: string) => (value: string) => english[key][value],
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () =>
    '/en/POST/aHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3Rz/IntcbiAgXCJib2R5XCI6IFwiaGVsbG8gd29ybGQhXCJcbn0i',
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

describe('RestAnaGraphi Component', () => {
  vi.mock('@store/selectors', () => ({
    selectUser: () => initialUser,
  }));
  it('renders RestAnaGraphi component correctly', async () => {
    const { store } = renderWithProviders(<InputEditor />);
    await act(async () => {
      store.dispatch(setNewResponse(responseTest));
    });
    const state = store.getState();
    expect(state.response.response).toEqual(responseTest.response);
    expect(screen.getByRole('textbox')).toHaveAttribute('value', responseTest.url);
    expect(screen.getByRole('combobox')).toHaveTextContent(responseTest.method);
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
    const user = userEvent.setup();
    await user.clear(screen.getByRole('textbox'));
    await user.type(screen.getByRole('textbox'), 'test');
    await user.click(screen.getByRole('button', { name: 'Send' }));
  });

  it('renders RestAnaGraphi component correctly', async () => {
    const { store } = renderWithProviders(<InputEditor />);
    await act(async () => {
      store.dispatch(setNewResponse(responseTest2));
    });
    const state = store.getState();
    expect(state.response.response).toEqual(responseTest2.response);
    expect(screen.getByRole('textbox')).toHaveAttribute('value', responseTest2.url);
    expect(screen.getByRole('combobox')).toHaveTextContent(responseTest2.method);
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Send' }));
  });

  it('renders RestAndGraphi component correctly', async () => {
    const { store } = renderWithProviders(<InputEditor />);
    await act(async () => {
      store.dispatch(setNewResponse(responseTest3));
    });
    const state = store.getState();
    expect(state.response.response).toEqual(responseTest3.response);
    expect(screen.getByPlaceholderText('https://example.com')).toHaveValue(responseTest3.url);
    expect(screen.getByPlaceholderText('SDL Endpoint')).toHaveValue(responseTest3.urlSdl);
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Send' }));
  });
});
