import { useEffect, useState, FC } from 'react';
import { Link } from 'react-router-dom';
import MutationRecord from './MutationRecord';
import useAuth from '@/hooks/useAuth';
import { TransactionProps, TransactionsProps } from '@/types/transaction';
import { ButtonPrimary } from '@/components';

function TransactionsList({ transactions }: TransactionsProps) {
  if (transactions) {
    return transactions.map((transaction: TransactionProps, index) => (
      <MutationRecord
        key={`transaction-${index}`}
        bankName="BCA"
        accountNumber={
          transaction.type == 'Pengeluaran'
            ? transaction.to.account_number
            : transaction.from.account_number
        }
        total={transaction.total}
        type={transaction.type}
        time={new Date(transaction.transaction_date)}
      />
    ));
  } else {
    return (
      <li className="mutation-record">
        <div className="mb-2 flex gap-2.5 text-lg font-bold">
          Tidak Ada Transaksi
        </div>
      </li>
    );
  }
}

const TableMutasi: FC = () => {
  const { api, token, userId } = useAuth();
  const [transactions, setTransactions] = useState<TransactionProps[] | null>(
    []
  );
  const MAX_TRANSACTIONS = 4;

  async function getTransactions(
    userId: string | null,
    startDate: string | null,
    endDate: string | null
  ) {
    let transactions: null | TransactionProps[] = null;
    api
      .post(
        `/api/transactions/history/${userId}`,
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
          if (transactions.length <= MAX_TRANSACTIONS)
            setTransactions(transactions);
          else setTransactions(transactions.splice(0, MAX_TRANSACTIONS));
        } else setTransactions(null);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    const startDate = new Date(0).toISOString();
    const endDate = new Date().toISOString();
    getTransactions(userId, startDate, endDate);
  }, [token, userId]);

  return (
    <section className="flex w-182.5 flex-col gap-2.5 sm:w-85">
      <div className="flex items-center justify-between">
        <h2
          className="text-xl-body uppercase"
          aria-label="mutasi rekening"
          tabIndex={0}
        >
          Transaksi Akun
        </h2>
        <Link to="/history">
          <ButtonPrimary
            className=""
            type="button"
            aria-label="tombol tampilkan semua transaksi"
          >
            Tampilkan Semua
          </ButtonPrimary>
        </Link>
      </div>
      {(transactions?.length ?? 0) > 0 ? (
        <ul id="mutation-table" aria-label="daftar mutasi rekening terakhir">
          <TransactionsList transactions={transactions} />
        </ul>
      ) : (
        <p>Tidak ada riwayat transaksi</p>
      )}
    </section>
  );
};

export default TableMutasi;
