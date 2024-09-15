import { screen, render } from '@testing-library/react';
import { describe, it } from 'vitest';
import '@testing-library/jest-dom';
import { ErrorComponent } from './ErrorComponent';
import userEvent from '@testing-library/user-event';

describe('ErrorComponent Component', () => {
  it('renders AboutProject component correctly', async () => {
    render(<ErrorComponent />);
    expect(screen.getByText(/Something went wrong. Refresh the page, please./i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Reload');
    await userEvent.click(screen.getByRole('button'));
  });
});
