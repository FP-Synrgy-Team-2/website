import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ButtonPrimary, TransactionData, TransactionsList } from '@/components';
import { TransactionProps } from '@/types/transaction';
import { AccountData } from '@/types/accounts';
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
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [activeTransaction, setActiveTransaction] =
    useState<TransactionProps | null>(null);
  const { token, userId, api } = useAuth();

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

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const transaction = e.currentTarget.getAttribute('data-transaction');
    const parsedTransaction = transaction ? JSON.parse(transaction) : null;
    setActiveTransaction(parsedTransaction);
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

  const fetchData = async () => {
    try {
      const response = await api.get(`/api/bank-accounts/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAccountData(response.data.data);
    } catch (error) {
      console.error('Error fetching invoice data:', error);
    }
  };

  useEffect(() => {
    const startDate = new Date(0).toISOString();
    const endDate = new Date().toISOString();
    getTransactions(userId, startDate, endDate);
    fetchData();
  }, [token]);
  return (
    <main className="flex flex-col gap-y-20">
      <section className="flex flex-col gap-y-2.5">
        <h2
          className="font-Inter text-xl-body font-medium text-neutral-03"
          aria-label="akun"
        >
          AKUN
        </h2>
        <div className="flex items-end justify-between">
          <div className="flex">
            {accountData && (
              <div className="flex flex-col gap-y-[5px] rounded-[10px] border border-black bg-primary-blue px-[30px] py-2.5">
                <span className="text-xl-body font-bold italic text-primary-light-blue">
                  BCA TABUNGANKu
                </span>
                <span className="text-md-body text-primary-light-blue">
                  {accountData.account_number}
                </span>
                <span className="text-md-body text-primary-light-blue">
                  {accountData.owner_name}
                </span>
              </div>
            )}
          </div>
          <button
            className="relative h-min rounded-[10px] bg-primary-light-blue py-[5px] pl-14 pr-5"
            aria-label="tombol filter"
            onClick={() => setShowModal(true)}
          >
            <div className="absolute left-3 top-[18px]">
              <img src="/images/icons/filter.svg" alt="" />
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
            <TransactionsList
              handleClick={handleClick}
              transactions={transactions}
              activeTransaction={activeTransaction}
            />
          </div>
          <div className="w-full">
            <TransactionData transaction={activeTransaction} />
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
                <ButtonPrimary onClick={handleApplyFilter}>
                  Gunakan Filter
                </ButtonPrimary>
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
