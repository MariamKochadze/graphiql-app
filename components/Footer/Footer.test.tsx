import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Image from 'next/image';
import { describe, expect, it, vi } from 'vitest';
import { Footer } from './Footer.component';

vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => <Image src={src} alt={alt} />,
}));

describe('Footer Component', () => {
  it('renders the GitHub links for all participants', () => {
    render(<Footer />);

    const participantGithubLink = [
      { githubLink: 'https://github.com/MariamKochadze', name: 'Mariam Kochadze' },
      { githubLink: 'https://github.com/kitakiv', name: 'Victoria Nykytenko' },
      { githubLink: 'https://github.com/AbdugafurovaUmida', name: 'Umida Abdugafurova' },
    ];

    participantGithubLink.forEach(participant => {
      const link = screen.getByRole('link', { name: participant.name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', participant.githubLink);
    });
  });

  it('renders the current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    const yearElement = screen.getByText(year.toString());
    expect(yearElement).toBeInTheDocument();
  });

  it('renders the RS School course logo', () => {
    render(<Footer />);
    const logo = screen.getByAltText('course-logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', expect.stringContaining('course-logo.png'));
  });
});
