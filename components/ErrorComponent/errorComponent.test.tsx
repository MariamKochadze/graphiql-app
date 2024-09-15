import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import { ErrorComponent } from './ErrorComponent';

describe('ErrorComponent Component', () => {
  it('renders AboutProject component correctly', async () => {
    render(<ErrorComponent />);
    expect(screen.getByText(/Something went wrong. Refresh the page, please./i)).toBeInTheDocument();
  });
});
