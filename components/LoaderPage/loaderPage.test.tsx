import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LoaderPage from './loaderPage';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    back: vi.fn(),
  })),
}));

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(() => () => 'Cancel'),
}));

describe('LoaderPage Component', () => {
  it('renders LoaderPage component correctly', async () => {
    render(<LoaderPage />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    const user = userEvent.setup();
    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });
});
