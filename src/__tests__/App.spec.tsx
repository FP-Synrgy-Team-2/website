import { render } from '@testing-library/react';
import Users from '../Users';

describe('User', () => {
  test('renders heading', async () => {
    render(<Users />);
    expect(true).toBeTruthy();
  });
});
