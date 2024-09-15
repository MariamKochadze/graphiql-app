import { screen, render } from '@testing-library/react';
import { describe, it } from 'vitest';
import '@testing-library/jest-dom';
import Card from './Card';
import VictoriaImg from '../../public/assets/Victoria.jpeg';

const Participants = {
  id: 2,
  img: VictoriaImg,
  name: 'Victoria Nykytenko',
  position: 'Participant2Position',
  detail: 'Participant2Description',
};

describe('Participants Component', () => {
  it('renders Participants component correctly', async () => {
    render(<Card item={Participants} key={Participants.id} />);
    expect(screen.getByText(/Victoria Nykytenko/i)).toBeInTheDocument();
    expect(screen.getByText(/Participant2Position/i)).toBeInTheDocument();
    expect(screen.getByText(/Participant2Description/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('alt', Participants.name);
  });
});
