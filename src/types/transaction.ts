interface TransactionProps {
  transaction_id: string;
  from: {
    account_id: string;
    owner_name: string;
    account_number: string;
  };
  to: {
    account_id: string;
    owner_name: string;
    account_number: string;
  };
  transaction_date: string;
  amount: number;
  admin_fee: number;
  total: number;
  note: string;
  type: string;
  transactional_type: string;
}

interface TransactionsProps {
  transactions: TransactionProps[] | null;
}

interface TransferFormValue {
  account_id: string;
  beneficiary_owner_name: string;
  beneficiary_account: string;
  beneficiary_name: string;
  amount: number;
  transaction_date: string; // Format: 'YYYY-MM-DD HH:mm:ss.SSS'
  note: string | null;
  is_saved: boolean;
}

export type { TransactionsProps, TransactionProps, TransferFormValue };
