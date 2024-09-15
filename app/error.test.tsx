import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import GlobalError from './global-error';

describe('ErrorComponent Component', () => {
  it('renders AboutProject component correctly', async () => {
    render(
      <GlobalError
        error={{
          digest: 'I test errors component',
          name: 'TestError',
          message: 'I test errors component',
        }}
      />
    );
    expect(screen.getByText(/Something went wrong. Refresh the page, please./i)).toBeInTheDocument();
  });
});
