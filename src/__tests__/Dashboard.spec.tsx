import { screen, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Dashboard } from '@/pages';
import AuthProvider from '@/contexts/AuthProvider';
import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
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

const mockAxios = new MockAdapter(axios);

describe('Dashboard Component', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      isAuthenticated: true,
      token: 'mock-token',
      userId: 'mock-user-id',
      login: jest.fn(),
      logout: jest.fn(),
      api: axios,
    }));

    mockAxios.onGet('/api/bank-accounts/user/mock-user-id').reply(200, {
      data: { account_number: '1234567890', balance: 1000 },
    });

    mockAxios.onPost('/api/transactions/history/mock-user-id').reply(200, {
      data: [
        {
          transaction_id: 'abcde-fghij-klmno',
          from: {
            account_id: 'abcde-fghij-klmno',
            owner_name: 'user 1',
            account_number: '12345678910',
          },
          to: {
            account_id: 'abcde-fghij-klmno',
            owner_name: 'user 1',
            account_number: '12345678910',
          },
          transaction_date: '2024-08-25T17:20:08.327+07:00',
          amount: 100000,
          admin_fee: 0,
          total: 100000,
          note: '-',
          type: 'Pengeluaran',
          transactional_type: 'TRANSFER',
        },
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('dashboard renders correctly', async () => {
    renderWithAuthProvider(<Dashboard />);
    await waitFor(() => {
      expect(screen.getByText(/REKENING TERSIMPAN/i)).toBeInTheDocument();
      expect(screen.getByText(/Nomor Rekening/i)).toBeInTheDocument();
      expect(screen.getByText(/1.000/i)).toBeInTheDocument();
      expect(screen.getByText(/Transaksi Akun/i)).toBeInTheDocument();
    });

    // Tampilkan semua
    expect(
      screen.getByRole('button', { name: /Tampilkan Semua/i })
    ).toBeInTheDocument();
    const mutationRecords = document.querySelectorAll('.mutation-record');
    expect(mutationRecords).toHaveLength(1);
  });
});
