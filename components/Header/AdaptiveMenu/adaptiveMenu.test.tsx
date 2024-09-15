import { screen, render } from '@testing-library/react';
import { vi } from 'vitest';
import { describe, it } from 'vitest';
import english from '../../../messages/en.json';
import '@testing-library/jest-dom';
import AdaptiveMenu from './AdaptiveMenu';
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
  it('renders AdaptiveMenu component correctly', async () => {
    render(
      <AdaptiveMenu
        user={{ uid: '123', displayName: 'John Doe', email: 'n9KJn@example.com' }}
        onSignOut={vi.fn()}
        isSticky={false}
      />
    );
    const user = userEvent.setup();
    const btn = screen.getByRole('button');
    await user.click(btn);
    expect(screen.getByText(english['HomePage']['sign-out'])).toBeInTheDocument();
    const close = screen.getByTestId('adaptive-menu');
    await user.click(close);
    expect(screen.queryByText(english['HomePage']['sign-out'])).not.toBeInTheDocument();
  });

  it('renders AdaptiveMenu component correctly', async () => {
    render(<AdaptiveMenu user={null} onSignOut={vi.fn()} isSticky={false} />);
    const user = userEvent.setup();
    const btn = screen.getByRole('button');
    await user.click(btn);
    expect(screen.getByText(english['HomePage']['sign-in'])).toBeInTheDocument();
    expect(screen.getByText(english['HomePage']['sign-up'])).toBeInTheDocument();
    await user.click(screen.getByText(english['HomePage']['sign-in']));
    expect(window.location.pathname).toBe('/');
  });
});
