import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Loading from './loading';

describe('LoaderPage Component', () => {
  it('renders LoaderPage component correctly', async () => {
    render(<Loading />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
