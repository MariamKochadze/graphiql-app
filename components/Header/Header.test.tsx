import { screen } from '@testing-library/react';
import { renderWithProviders } from '@testSetup/render-router';
import { describe, expect, it } from 'vitest';
import { Header } from './Header.component';

const useRouterPushMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: useRouterPushMock,
  }),
  usePathname: () => '/',
  useSearchParams: () => ({
    get: (key: string) => {
      const params = new URLSearchParams('details=1');
      return params.get(key);
    },
  }),
}));

describe('Header Component', () => {
  it('should render correctly and contain all required elements', async () => {
    renderWithProviders(<Header />);

    const themeCheckbox = await screen.findByText('Header');
    expect(themeCheckbox).toBeInTheDocument();
  });
});
