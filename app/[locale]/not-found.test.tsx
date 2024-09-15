import NotFoundPage from './not-found';
import { it, describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('NotFoundPage Component', () => {
  it('renders NotFoundPage component correctly', async () => {
    render(<NotFoundPage />);
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/But don't worry, you can always:/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
