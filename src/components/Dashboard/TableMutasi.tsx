import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MutationRecord from './MutationRecord';
import useAuth from '@/hooks/useAuth';

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
}

interface TransactionsListProps {
  transactions: TransactionProps[] | null;
}

function TransactionsList({ transactions }: TransactionsListProps) {
  if (transactions) {
    return transactions.map((transaction: TransactionProps, index) => (
      <MutationRecord
        key={`transaction-${index}`}
        bankName="BCA"
        accountNumber={872726241}
        total={transaction.total}
        type={transaction.type}
        time={new Date(transaction.transaction_date)}
      />
    ));
  }
}

const TableMutasi: React.FC = () => {
  const { api, token, userId } = useAuth();
  const [transactions, setTransactions] = useState<TransactionProps[] | null>(
    []
  );

  async function getTransactions(
    userId: string | null,
    startDate: string | null,
    endDate: string | null
  ) {
    const URL = import.meta.env.VITE_API_URL;
    let transactions: null | TransactionProps[] = null;
    api
      .post(
        URL + `/transactions/history/${userId}`,
        {
          start_date: startDate,
          end_date: endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        transactions = res.data.data;
        if (transactions && Array.isArray(transactions)) {
          if (transactions.length <= 8) setTransactions(transactions);
          else setTransactions(transactions.splice(0, 8));
        } else setTransactions(null);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    const startDate = new Date(0).toISOString();
    const endDate = new Date().toISOString();
    getTransactions(userId, startDate, endDate);
  }, [token]);

  return (
    <section className="flex w-182.5 flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg uppercase" aria-label="mutasi rekening">
          Transaksi Akun
        </h2>
        <Link to="/history">
          <button
            className="h-12 w-42 rounded-xl bg-primary-blue p-2.5 text-center text-lg font-bold uppercase text-neutral-01"
            type="button"
            aria-label="tombol tampilkan semua"
          >
            Tampilkan Semua
          </button>
        </Link>
      </div>
      <ul id="mutation-table" aria-label="daftar mutasi rekening terakhir">
        <TransactionsList transactions={transactions} />
      </ul>
    </section>
  );
};

export default TableMutasi;
