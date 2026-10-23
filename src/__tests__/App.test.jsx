import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renderiza Header, NavTabs y BotonSOS', () => {
    render(<App />);
    expect(screen.getByRole('navigation', { name: /navegación/i })).toBeInTheDocument();
  });
});
