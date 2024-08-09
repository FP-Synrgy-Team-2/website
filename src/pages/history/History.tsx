import useAuth from '@/hooks/useAuth';
import TransactionsList from '@/components/History/TransactionsList';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
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

type Value = CalendarProps['value'];

const formatDate = (date: Date | null) => {
  if (!date) return '';
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat('id-ID', options).format(date);
};

function History() {
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [transactions, setTransactions] = useState<TransactionProps[] | null>(
    []
  );
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const { token, userId } = useAuth();

  const navigate = useNavigate();

  const handleDateChange = (
    setter: React.Dispatch<React.SetStateAction<Date | null>>
  ) => {
    return (
      value: Value,
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      if (!Array.isArray(value) && value instanceof Date && event) {
        setter(value);
      }
    };
  };

  const handleApplyFilter = () => {
    setShowModal(false);
    if (startDate && endDate)
      getTransactions(
        userId,
        startDate.toLocaleDateString('en-CA'),
        endDate.toLocaleDateString('en-CA')
      );
  };

  const handleDownload = () => {
    if (transactionId) navigate(`/transfer/invoice/${transactionId}`);
  };

  async function getTransactions(
    userId: string | null,
    startDate: string | null,
    endDate: string | null
  ) {
    const URL = import.meta.env.VITE_API_URL;
    let transactions: null | TransactionProps[] = null;
    axios
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
        if (transactions) {
          setTransactions(transactions);
        } else setTransactions(null);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    setTransactionId(null);
    const startDate = new Date(0).toISOString();
    const endDate = new Date().toISOString();
    getTransactions(userId, startDate, endDate);
  }, [token]);

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
            className="relative h-min rounded-[10px] bg-primary-light-blue py-[5px] pl-14 pr-5"
            aria-label="tombol filter"
            onClick={() => setShowModal(true)}
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
        </div>
      </section>
      <section className="flex flex-col gap-y-2.5 pb-10">
        <h2
          className="font-Inter text-xl-body font-medium text-neutral-03"
          aria-label="MUTASI REKENING"
        >
          MUTASI REKENING
        </h2>
        <div className="flex justify-between gap-x-[30px]">
          <div className="flex w-full flex-col gap-y-[30px]">
            <TransactionsList transactions={transactions} />
          </div>
          <div className="flex w-full flex-col items-center gap-5">
            <div className="flex h-max items-center justify-center rounded-[20px] bg-white px-[30px] py-[60px] shadow-[0_4px_5px_5px_#EAF6FF]">
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
            <button
              className="relative flex items-center gap-5 rounded-[10px] bg-primary-dark-blue px-5 py-[5px] text-2xl font-bold text-white"
              onClick={handleDownload}
            >
              <svg
                width="17"
                height="18"
                viewBox="0 0 17 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 11.5V14.8333C16 15.2754 15.8244 15.6993 15.5118 16.0118C15.1993 16.3244 14.7754 16.5 14.3333 16.5H2.66667C2.22464 16.5 1.80072 16.3244 1.48816 16.0118C1.17559 15.6993 1 15.2754 1 14.8333V11.5M4.33333 7.33333L8.5 11.5M8.5 11.5L12.6667 7.33333M8.5 11.5V1.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Unduh</span>
            </button>
          </div>
        </div>

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
                    onChange={handleDateChange(setStartDate)}
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
                    onChange={handleDateChange(setEndDate)}
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
                  onClick={handleApplyFilter}
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
      </section>
    </main>
  );
}

export default History;
