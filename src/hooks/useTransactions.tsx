import { TransactionsContext } from '@/contexts/TransactionContext';
import { useContext } from 'react';

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error(
      'useTransactions must be used within a TransactionsProvider'
    );
  }
  return context;
};
