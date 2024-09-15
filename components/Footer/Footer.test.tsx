import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Footer } from './Footer.component';

describe('Footer Component', () => {
  it('renders Footer component correctly', () => {
    render(<Footer />);

    // Check if the current year is displayed
    expect(screen.getByText(new Date().getFullYear().toString())).toBeInTheDocument();

    // Check if the course logo is present
    expect(screen.getByAltText('course-logo')).toBeInTheDocument();

    // Check if the GitHub icons are present
    expect(screen.getAllByAltText(/Mariam Kochadze|Victoria Nykytenko|Umida Abdugafurova/)).toHaveLength(3);
  });

  it('renders GitHub icons with correct links', () => {
    render(<Footer />);

    // Check if the GitHub icons have the correct links
    const githubLinks = screen.getAllByRole('link');

    expect(githubLinks[0]).toHaveAttribute('href', 'https://github.com/MariamKochadze');
    expect(githubLinks[1]).toHaveAttribute('href', 'https://github.com/kitakiv');
    expect(githubLinks[2]).toHaveAttribute('href', 'https://github.com/AbdugafurovaUmida');
  });
});
