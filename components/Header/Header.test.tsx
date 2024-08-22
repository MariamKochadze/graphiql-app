import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Header } from './Header.component';

vi.mock('next-intl', () => ({
  useTranslations: vi.fn().mockReturnValue((key: string) => key),
}));

vi.mock('@components/LocaleSwitcher/LocaleSwitcher', () => ({
  __esModule: true,
  default: () => <div>LocaleSwitcher</div>,
}));

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>,
}));

describe('Header Component', () => {
  it('renders correctly without sticky class initially', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).not.toHaveClass('sticky');
    expect(screen.getByText('LocaleSwitcher')).toBeInTheDocument();
  });

  it('adds sticky class on scroll', () => {
    render(<Header />);

    const headerElement = screen.getByTestId('header');

    window.scrollY = 100;
    fireEvent.scroll(window);

    expect(headerElement).toHaveClass('scrolled py-5 bg-regal-blue sticky top-0 left-0 mb-20');
  });
});
