import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Logo from './Logo';

describe('LoaderPage Component', () => {
  it('renders LoaderPage component correctly', async () => {
    render(<Logo isSticky={true} />);
    expect(screen.getByTestId('icon-logo')).toBeInTheDocument();
  });
});
