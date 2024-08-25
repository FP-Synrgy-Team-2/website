import {
  getByLabelText,
  screen,
  render,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Login } from '@/pages';
import AuthProvider from '@/contexts/AuthProvider';
import React from 'react';

import { VITE_API_URL } from '@/constants';
import useAuth from '@/hooks/useAuth';
jest.mock('@/constants', () => ({
  VITE_API_URL: 'https://jangkau1-65einymbia-et.a.run.app',
}));

jest.mock('@/hooks/useAuth', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const renderWithAuthProvider = (ui: React.ReactElement) => {
  return render(
    <MemoryRouter>
      <AuthProvider>{ui}</AuthProvider>
    </MemoryRouter>
  );
};

test('api url', () => {
  expect(VITE_API_URL).toBe('https://jangkau1-65einymbia-et.a.run.app');
});

describe('Login Component', () => {
  const mockLogin = jest.fn();
  const mockIsAuthenticated = false;

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      isAuthenticated: mockIsAuthenticated,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the login form', () => {
    renderWithAuthProvider(<Login />);

    expect(getByLabelText(document.body, /username/i)).toBeInTheDocument();
    expect(getByLabelText(document.body, /password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /masuk/i }) as HTMLElement
    ).toBeInTheDocument();
  });

  test('toggles password visibility', async () => {
    renderWithAuthProvider(<Login />);

    const passwordInput = screen.getByPlaceholderText(
      'Masukkan password anda'
    ) as HTMLInputElement;

    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(
      screen.getByRole('button', { name: /tampilkan password/i })
    );

    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(
      screen.getByRole('button', { name: /sembunyikan password/i })
    );

    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('shows validation error when username is invalid', async () => {
    renderWithAuthProvider(<Login />);

    const usernameInput = screen.getByPlaceholderText(
      'Masukkan username anda'
    ) as HTMLInputElement;

    const passwordInput = screen.getByPlaceholderText(
      'Masukkan password anda'
    ) as HTMLInputElement;

    fireEvent.input(usernameInput, {
      target: { value: 'invalidusername' },
    });

    fireEvent.input(passwordInput, {
      target: { value: 'ValidPassword123!' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /masuk/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/masukkan username yang valid/i)
      ).toBeInTheDocument();
    });
  });

  test('shows validation error when password is invalid', async () => {
    renderWithAuthProvider(<Login />);

    const usernameInput = screen.getByPlaceholderText(
      'Masukkan username anda'
    ) as HTMLInputElement;

    const passwordInput = screen.getByPlaceholderText(
      'Masukkan password anda'
    ) as HTMLInputElement;

    fireEvent.input(usernameInput, {
      target: { value: 'ValidUsername123' },
    });

    fireEvent.input(passwordInput, {
      target: { value: 'invalidpassword' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /masuk/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/masukkan password yang valid/i)
      ).toBeInTheDocument();
    });
  });

  test('submits the form when valid data is provided', async () => {
    renderWithAuthProvider(<Login />);

    const usernameInput = screen.getByPlaceholderText(
      'Masukkan username anda'
    ) as HTMLInputElement;

    const passwordInput = screen.getByPlaceholderText(
      'Masukkan password anda'
    ) as HTMLInputElement;

    fireEvent.input(usernameInput, {
      target: { value: 'ValidUsername123' },
    });

    fireEvent.input(passwordInput, {
      target: { value: 'ValidPassword123!' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /masuk/i }));
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        { username: 'ValidUsername123', password: 'ValidPassword123!' },
        '/dashboard',
        '/login'
      );
    });
  });
});
