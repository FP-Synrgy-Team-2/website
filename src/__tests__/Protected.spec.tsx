import React from 'react';
import { renderWithAuthProvider } from './utils';
import useAuth from '@/hooks/useAuth';
import { Protected } from '@/components';
import { screen } from '@testing-library/react';

jest.mock('@/constants', () => ({
  VITE_API_URL: 'https://jangkau1-65einymbia-et.a.run.app',
}));

jest.mock('@/hooks/useAuth', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const MockComponent = () => <div>Protected Content</div>;
describe('Protected Component', () => {
  test('should redirect to login if not authenticated', () => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      isAuthenticated: false,
    }));

    renderWithAuthProvider(
      <Protected>
        <MockComponent />
      </Protected>
    );

    // go to login
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  test('should render children if authenticated', () => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      isAuthenticated: true,
    }));

    renderWithAuthProvider(
      <Protected>
        <MockComponent />
      </Protected>
    );
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });
});
