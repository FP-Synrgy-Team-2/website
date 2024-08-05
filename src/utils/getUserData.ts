import { Api } from '@/api/api';

export const getAccountId = async (
  api: Api,
  accountNumber: string,
  token: string | null
) => {
  try {
    const response = await api.get(
      `/api/bank-accounts/account/${accountNumber}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data.account_id;
  } catch (error) {
    console.error('Error fetching account ID:', error);
    throw error;
  }
};

export const getAccountNumber = async (
  api: Api,
  userId: string | null,
  token: string | null
) => {
  try {
    const response = await api.get(`/api/bank-accounts/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.account_number;
  } catch (error) {
    console.error('Error fetching account number:', error);
    throw error;
  }
};
