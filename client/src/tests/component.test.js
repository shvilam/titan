
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

test('it get quouts from server', async () => {
  render(<App />);
  const input = screen.getByTestId('numOfQuotes'); 
  fireEvent.change(input, { target: { value: '1' } });
  const button = screen.getByText('Get Quotes');
  fireEvent.click(button);
  expect(await screen.findByText('Read more')).toBeInTheDocument();
});

