import { act, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { it } from 'vitest';
import { renderWithProviders } from '../../utils/test-utils';
import english from '../../messages/en.json';
import '@testing-library/jest-dom';
import { ResponseState } from '@app/common/interface/interface';
import { setNewResponse } from '@store/features/response/responseSlice';
import InputEditor from './InputEditor';
import { setUser } from '@store/userSlice';

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

it('renders RestAnaGraphi component correctly', async () => {
  vi.mock('@store/selectors', () => ({
    selectUser: () => null,
  }));
  const { store } = renderWithProviders(<InputEditor />);
  await act(async () => {
    await store.dispatch(setNewResponse(responseTest));
    await store.dispatch(setUser(null));
  });
  const state = store.getState();
  expect(state.response.response).toEqual(responseTest.response);
  expect(state.user.user).toBeNull();
  expect(screen.getByText(/redirecting/i)).toBeInTheDocument();
});
