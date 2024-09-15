import { screen, render } from '@testing-library/react';
import { vi } from 'vitest';
import { describe, it } from 'vitest';
import english from '../../../messages/en.json';
import '@testing-library/jest-dom';
import NavMenu from './NavMenu';
import userEvent from '@testing-library/user-event';

vi.mock('next-intl', async importOriginal => {
  const actual = await importOriginal();
  return {
    ...(actual as typeof import('next-intl')),
    useTranslations: (key: string) => (value: string) => english[key][value],
  };
});

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe('AdaptiveMenu Component', () => {
  it('renders NavMenu component correctly', async () => {
    render(<NavMenu user={null} onSignOut={vi.fn()} />);
    const user = userEvent.setup();
    expect(screen.getByText(english['HomePage']['sign-in'])).toBeInTheDocument();
    expect(screen.getByText(english['HomePage']['sign-up'])).toBeInTheDocument();
    await user.click(screen.getByText(english['HomePage']['sign-in']));
    expect(window.location.pathname).toBe('/');
  });
});
