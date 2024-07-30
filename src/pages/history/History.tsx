import axios from 'axios';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../index.css';

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

const formatDate = (date: Date | null) => {
  if (!date) return '';
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat('id-ID', options).format(date);
};

const returnLocalDateAndTime = (transactionDate: string) => {
  const dateObj = new Date(transactionDate);
  const localDate = dateObj.toLocaleDateString('id-ID', { dateStyle: 'full' });
  const localTime = dateObj
    .toLocaleTimeString('id-ID', { hour12: false })
    .slice(0, -3);
  return { localDate, localTime };
};

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
}) => {
  if (!transactions) return null;

  return (
    <>
      {transactions.map((transaction, index) => (
        <div
          key={`transaction-${index}`}
          className="flex w-[520px] flex-col rounded-[10px] border border-black border-opacity-40 px-[11px] py-2"
          aria-label={`Transfer BCA - 872726231 ${transaction.amount} ${returnLocalDateAndTime(transaction.transaction_date)}`}
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
            <span className="text-xl-body">{transaction.amount}</span>
            <span className="text-xl-body text-neutral-03">
              {returnLocalDateAndTime(transaction.transaction_date).localDate}{' '}
              {returnLocalDateAndTime(transaction.transaction_date).localTime}
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

const History: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [transactions, setTransactions] = useState<TransactionsProps[] | null>(
    []
  );

  const getTransactions = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL;
      const res = await axios.get<TransactionsProps>(
        `${URL}/transaction/47827600-27d1-45e7-ab80-31755f5737b0`
      );
      const transaction = res.data;
      if (transaction) {
        const transactionsTmp: TransactionsProps[] = Array(5).fill(transaction);
        setTransactions(transactionsTmp);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <main className="flex flex-col gap-y-20 pl-10 pr-20 pt-[112px]">
      <section className="flex flex-col gap-y-2.5">
        <h2
          className="font-Inter text-xl-body font-medium text-neutral-03"
          aria-label="akun"
        >
          AKUN
        </h2>
        <div className="flex items-end justify-between">
          <div className="flex">
            <div
              className="flex flex-col gap-y-[5px] rounded-[10px] border border-black bg-primary-blue px-[30px] py-2.5"
              aria-label="BCA TABUNGANKu 89993425716257 ZAKIANSYAH"
            >
              <span className="text-xl-body font-bold italic text-primary-light-blue">
                BCA TABUNGANKu
              </span>
              <span className="text-md-body text-primary-light-blue">
                89993425716257
              </span>
              <span className="text-md-body text-primary-light-blue">
                ZAKIANSYAH
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="relative h-min rounded-[10px] bg-primary-light-blue py-[5px] pl-14 pr-5"
            aria-label="tombol filter"
          >
            <div className="absolute left-3 top-[18px]">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5 2.5C4.44772 2.5 4 2.94772 4 3.5V5.50001H20V3.5C20 2.94772 19.5523 2.5 19 2.5H5ZM19.7822 7.50001H4.21776C4.3321 7.72455 4.48907 7.92794 4.68299 8.09762L10.683 13.3476C11.437 14.0074 12.563 14.0074 13.317 13.3476L19.317 8.09762C19.5109 7.92794 19.6679 7.72455 19.7822 7.50001Z"
                  fill="#222222"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14 17.2049L14 10.5H10V19.2049L14 17.2049Z"
                  fill="#222222"
                />
              </svg>
            </div>
            <span className="text-md-display font-bold text-primary-dark-blue">
              Filter
            </span>
          </button>
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="relative w-[800px] rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-center text-xl font-semibold">
                  Filter Mutasi
                </h2>
                <div className="mb-6 flex justify-between gap-[150px]">
                  <div className="text-center">
                    <label
                      className="mb-2 block text-sm font-bold text-gray-700"
                      htmlFor="startDate"
                    >
                      Tanggal Mulai
                    </label>
                    <Calendar
                      onChange={setStartDate}
                      value={startDate}
                      className="react-calendar"
                    />
                    <button className="focus:shadow-outline mt-4 rounded border border-primary-dark-blue bg-white px-5 py-2 font-bold text-primary-dark-blue focus:outline-none">
                      {formatDate(startDate)}
                    </button>
                  </div>
                  <div className="text-center">
                    <label
                      className="mb-2 block text-sm font-bold text-gray-700"
                      htmlFor="endDate"
                    >
                      Tanggal Akhir
                    </label>
                    <Calendar
                      onChange={setEndDate}
                      value={endDate}
                      className="react-calendar"
                    />
                    <button className="focus:shadow-outline mt-4 rounded border border-primary-dark-blue bg-white px-5 py-2 font-bold text-primary-dark-blue focus:outline-none">
                      {formatDate(endDate)}
                    </button>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => console.log('Filter applied')}
                    className="focus:shadow-outline w-1/4 rounded bg-primary-dark-blue px-2 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                  >
                    Gunakan Filter
                  </button>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="flex flex-col gap-y-2.5">
        <h2
          className="font-Inter text-xl-body font-medium text-neutral-03"
          aria-label="MUTASI REKENING"
        >
          MUTASI REKENING
        </h2>
        <div className="flex justify-between gap-x-[30px]">
          <div className="flex flex-col gap-y-[30px]">
            <TransactionsList transactions={transactions} />
          </div>
          <div className="flex items-center justify-center rounded-[20px] bg-white px-[30px] shadow-[0_4px_5px_5px_#EAF6FF]">
            <div className="flex flex-col gap-y-5">
              <div className="flex w-[447px] flex-col items-center">
                <div className="flex h-12.5 w-12.5 items-center justify-center rounded-[25px] bg-success">
                  <img
                    src="/images/icons/checklist.png"
                    alt=""
                    className="w-[22.5px]"
                  />
                </div>
                <span className="text-center text-xl-body font-bold">
                  Transaksi Berhasil
                </span>
                <div className="flex items-center gap-x-2">
                  <span className="text-sm-body text-dark-grey">
                    10 Juni 2024
                  </span>
                  <div className="h-2.5 w-2.5 rounded-[5px] bg-dot-grey"></div>
                  <span className="text-sm-body text-dark-grey">10.30</span>
                </div>
              </div>
              <div className="h-0 w-full rounded-[3px] border-[3px] border-neutral-03 border-opacity-30"></div>
              <div className="grid grid-cols-[170px_126px] gap-x-[7.5px] gap-y-[15px] px-[30px] text-xl-body">
                <span className="text-muted-black">Rekening Sumber</span>
                <span className="text-dark-grey">8923445590</span>
                <span className="text-muted-black">Rekening Tujuan</span>
                <span className="text-dark-grey">2448901238</span>
                <span className="text-muted-black">Nama penerima</span>
                <span className="text-dark-grey">John</span>
                <span className="text-muted-black">Nominal Transfer </span>
                <span className="text-dark-grey">Rp 100.000</span>
                <span className="text-muted-black">Biaya Admin</span>
                <span className="text-dark-grey">Rp 0</span>
                <span className="text-muted-black">Catatan</span>
                <span className="text-dark-grey">Bayar makanan</span>
                <span className="font-bold text-muted-black">Total</span>
                <span className="font-bold text-dark-grey">Rp 100.000</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default History;
