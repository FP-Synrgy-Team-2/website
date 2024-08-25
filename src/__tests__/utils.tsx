import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AuthProvider from '@/contexts/AuthProvider';
import React from 'react';

import { VITE_API_URL } from '@/constants';
jest.mock('@/constants', () => ({
  VITE_API_URL: 'https://jangkau1-65einymbia-et.a.run.app',
}));

jest.mock('@/hooks/useAuth', () => ({
  __esModule: true,
  default: jest.fn(),
}));

test('api url', () => {
  expect(VITE_API_URL).toBe('https://jangkau1-65einymbia-et.a.run.app');
});

export const renderWithAuthProvider = (ui: React.ReactElement) => {
  return render(
    <MemoryRouter>
      <AuthProvider>{ui}</AuthProvider>
    </MemoryRouter>
  );
};
