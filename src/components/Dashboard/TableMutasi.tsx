import React, { useCallback, useEffect, useState } from 'react';
import MutationRecord from './MutationRecord';
import useAuth from '@/hooks/useAuth';
interface TransactionsProps {
  transaction_id: string;
  account_id: string;
  beneficiary_account: string;
  amount: number;
  admin_fee: number;
  transaction_date: string;
  note: string;
  total: number;
}

interface TransactionsListProps {
  transactions: TransactionsProps[] | null;
}

function TransactionsList({ transactions }: TransactionsListProps) {
  if (transactions) {
    return transactions.map((transaction: TransactionsProps, index) => (
      <MutationRecord
        key={`transaction-${index}`}
        bankName="BCA"
        accountNumber={872726241}
        amount={transaction.amount}
        time={new Date(transaction.transaction_date)}
      />
    ));
  }
}

const TableMutasi: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionsProps[] | null>(
    []
  );

  const { api, userId, token } = useAuth()

  const getTranscations = useCallback(() => {
    let transaction: null | TransactionsProps = null;
    api
      .get(`/api/transaction/47827600-27d1-45e7-ab80-31755f5737b0`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        transaction = res.data;
        if (transaction) {
          const transactionsTmp: TransactionsProps[] = [];
          for (let i = 0; i < 4; i++) {
            transactionsTmp.push(transaction);
          }
          setTransactions(transactionsTmp);
          return transactions;
        }
      })
      .catch((err) => console.log(err));
  }, [setTransactions])

  useEffect(() => {
    getTranscations()
  }, [getTranscations]);

  return (
    <section className="flex w-182.5 flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg uppercase" aria-label="mutasi rekening">
          Transaksi Akun
        </h2>
        <button
          className="h-12 w-42 rounded-xl bg-primary-blue p-2.5 text-center text-lg font-bold uppercase text-neutral-01"
          type="button"
          aria-label="tombol tampilkan semua"
        >
          Tampilkan Semua
        </button>
      </div>
      <ul id="mutation-table" aria-label="daftar mutasi rekening terakhir">
        <TransactionsList transactions={transactions} />
      </ul>
    </section>
  );
};

export default TableMutasi;
