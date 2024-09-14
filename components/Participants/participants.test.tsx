import { screen, render } from '@testing-library/react';
import { vi } from 'vitest';
import { describe, it } from 'vitest';
import english from '../../messages/en.json';
import '@testing-library/jest-dom';
import Participants from './Participants';

vi.mock('next-intl', () => ({
  useTranslations: (key: string) => (value: string) => english[key][value],
}));

describe('Participants Component', () => {
  it('renders Participants component correctly', async () => {
    render(<Participants />);
    expect(screen.getByText(english['HomePage']['ParticipantsTitle'])).toBeInTheDocument();
  });
});
