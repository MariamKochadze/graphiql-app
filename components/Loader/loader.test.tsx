import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LoadingSpinner from './LoadingSpinner';

describe('LoaderPage Component', () => {
  it('renders LoaderPage component correctly', async () => {
    render(<LoadingSpinner />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
