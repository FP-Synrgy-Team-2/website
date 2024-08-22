import { TransactionProps } from '@/types/transaction';
import formatRupiah from '@/utils/formatRupiah';

interface TransactionListProps {
  transactions: TransactionProps[] | null;
  handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  activeTransaction: TransactionProps | null;
}

const returnLocalDateAndTime = (transactionDate: string) => {
  const dateObj = new Date(transactionDate);
  const localDate = dateObj.toLocaleDateString('id-ID', { dateStyle: 'full' });
  const localTime = dateObj
    .toLocaleTimeString('id-ID', { hour12: false })
    .slice(0, -3);
  return { localDate, localTime };
};

function TransactionsList({
  transactions,
  handleClick,
  activeTransaction,
}: TransactionListProps) {
  if (transactions) {
    return transactions.map((transaction: TransactionProps, index: number) => (
      <div
        onClick={handleClick}
        data-transaction={JSON.stringify(transaction)}
        key={`transaction-${index}`}
        className={`flex cursor-pointer flex-col rounded-[10px] border border-black border-opacity-40 px-[11px] py-2 ${activeTransaction?.transaction_id === transaction.transaction_id ? 'bg-primary-light-blue' : ''} `}
      >
        <div className="flex gap-x-2.5">
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[15px] bg-primary-light-blue xl:h-5 xl:w-5">
            <img src="/images/icons/arrow-up-down.svg" alt="" />
          </div>
          <span className="text-2xl font-bold xl:text-xl">
            {transaction.type === 'Pengeluaran' ? 'Transfer' : 'Terima Uang'}
          </span>
        </div>

        <div className="grid grid-cols-3 justify-between gap-x-[5px] text-xl-body xl:text-md-body sm:grid-cols-1">
          <span>
            BCA -{' '}
            {transaction.type === 'Pengeluaran'
              ? transaction.to.account_number
              : transaction.from.account_number}
          </span>
          <span>{`${transaction.type === 'Pengeluaran' ? '-' : '+'}${formatRupiah(transaction.total)}`}</span>
          <span className="text-neutral-03">
            {returnLocalDateAndTime(transaction.transaction_date).localDate}{' '}
            {returnLocalDateAndTime(transaction.transaction_date).localTime}
          </span>
        </div>
      </div>
    ));
  } else {
    return (
      <div
        onClick={handleClick}
        className={`flex justify-center rounded-[10px] border-2 border-danger bg-danger bg-opacity-20 px-[11px] py-2`}
      >
        <span className="text-2xl font-bold text-danger xl:text-xl">
          Tidak Ada Transaksi
        </span>
      </div>
    );
  }
}

export default TransactionsList;
