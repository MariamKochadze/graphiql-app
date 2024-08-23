import { fireEvent, render, screen } from '@testing-library/react';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { describe, expect, it, vi } from 'vitest';
import { Header } from './Header.component';

vi.mock('next-intl', () => ({
  useTranslations: vi.fn().mockReturnValue((key: string) => key),
}));

vi.mock('@components/LocaleSwitcher/LocaleSwitcher', () => ({
  __esModule: true,
  default: () => <div>LocaleSwitcher</div>,
}));

vi.mock('next-intl/navigation', () => {
  return {
    createSharedPathnamesNavigation: vi.fn(() => ({
      Link: 'LinkComponentMock',
      redirect: vi.fn(),
      usePathname: vi.fn(() => '/en/authentication'),
      useRouter: vi.fn(() => ({
        push: vi.fn(),
        replace: vi.fn(),
      })),
    })),
  };
});

describe('createSharedPathnamesNavigation', () => {
  it('should correctly create shared pathnames navigation', () => {
    const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation();

    expect(Link).toBe('LinkComponentMock');
    expect(typeof redirect).toBe('function');
    expect(usePathname()).toBe('/en/authentication');

    const router = useRouter();
    expect(typeof router.push).toBe('function');
    expect(typeof router.replace).toBe('function');
  });

  it('should handle locale navigation correctly', () => {
    const { useRouter } = createSharedPathnamesNavigation();
    const router = useRouter();

    // Simulate navigation
    router.push('/ru/authentication');
    expect(router.push).toHaveBeenCalledWith('/ru/authentication');
  });
});

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

    expect(headerElement).toHaveClass('scrolled py-5 bg-regal-blue sticky top-0 left-0 mb-20 z-40');
  });
});
