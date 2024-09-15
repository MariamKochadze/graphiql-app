import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Logo from './Logo';
import { Document } from './Document';
import { Prettier } from './Prettier';
import { Play } from './Play';

describe('LoaderPage Component', () => {
  it('renders LoaderPage component correctly', async () => {
    render(<Logo isSticky={true} />);
    expect(screen.getByTestId('icon-logo')).toBeInTheDocument();
  });

  it('renders LoaderPage component correctly', async () => {
    render(<Document />);
    expect(screen.getByTestId('document')).toBeInTheDocument();
  });

  it('renders LoaderPage component correctly', async () => {
    render(<Play />);
    expect(screen.getByTestId('play')).toBeInTheDocument();
  });

  it('renders LoaderPage component correctly', async () => {
    render(<Prettier />);
    expect(screen.getByTestId('prettier')).toBeInTheDocument();
  });
});
