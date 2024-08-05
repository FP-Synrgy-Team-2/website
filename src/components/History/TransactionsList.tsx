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
  note: number;
  type: string;
}

interface TransactionsProps {
  transactions: TransactionProps[] | null;
}

const returnLocalDateAndTime = (transactionDate: string) => {
  const dateObj = new Date(transactionDate);
  const localDate = dateObj.toLocaleDateString('id-ID', { dateStyle: 'full' });
  const localTime = dateObj
    .toLocaleTimeString('id-ID', { hour12: false })
    .slice(0, -3);
  return { localDate, localTime };
};

function TransactionsList({ transactions }: TransactionsProps) {
  if (transactions) {
    return transactions.map((transaction: TransactionProps, index) => (
      <div
        key={`transaction-${index}`}
        className="flex flex-col rounded-[10px] border border-black border-opacity-40 px-[11px] py-2"
        aria-label={`Transfer BCA - 872726231 ${transaction.type === 'Pengeluaran' ? '-' : '+'} ${transaction.total} ${returnLocalDateAndTime(transaction.transaction_date)}`}
      >
        <div className="flex gap-x-2.5">
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[15px] bg-primary-light-blue">
            <svg
              width="19"
              height="18"
              viewBox="0 0 19 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.20313 1.5L5.49602 0.792893L6.20313 0.0857863L6.91023 0.792893L6.20313 1.5ZM7.20313 12.75C7.20313 13.3023 6.75541 13.75 6.20313 13.75C5.65084 13.75 5.20313 13.3023 5.20313 12.75L7.20313 12.75ZM1.74602 4.54289L5.49602 0.792893L6.91023 2.20711L3.16023 5.95711L1.74602 4.54289ZM6.91023 0.792893L10.6602 4.54289L9.24602 5.95711L5.49602 2.20711L6.91023 0.792893ZM7.20312 1.5L7.20313 12.75L5.20313 12.75L5.20313 1.5L7.20312 1.5Z"
                fill="#0066AE"
              />
              <path
                d="M12.2031 16.5L11.496 17.2071L12.2031 17.9142L12.9102 17.2071L12.2031 16.5ZM13.2031 5.25C13.2031 4.69772 12.7554 4.25 12.2031 4.25C11.6508 4.25 11.2031 4.69771 11.2031 5.25L13.2031 5.25ZM7.74602 13.4571L11.496 17.2071L12.9102 15.7929L9.16023 12.0429L7.74602 13.4571ZM12.9102 17.2071L16.6602 13.4571L15.246 12.0429L11.496 15.7929L12.9102 17.2071ZM13.2031 16.5L13.2031 5.25L11.2031 5.25L11.2031 16.5L13.2031 16.5Z"
                fill="#0066AE"
              />
            </svg>
          </div>
          <span className="text-2xl font-bold">Transfer</span>
        </div>
        <div className="flex justify-between gap-x-[5px]">
          <span className="text-xl-body">BCA - 872726241</span>
          <span className="text-xl-body">{`${transaction.type === 'Pengeluaran' ? '-' : '+'}${transaction.total}`}</span>
          <span className="text-xl-body text-neutral-03">
            {returnLocalDateAndTime(transaction.transaction_date).localDate}{' '}
            {returnLocalDateAndTime(transaction.transaction_date).localTime}
          </span>
        </div>
      </div>
    ));
  }
}

export default TransactionsList;
