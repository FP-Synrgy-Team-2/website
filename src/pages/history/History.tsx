import useAuth from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { TransactionData, TransactionsList } from '@/components';
import { TransactionProps } from '@/types/transaction';
import FilterModal from '@/components/History/FilterModal';
import Loading from '@/components/General/Loading';
import {
  TransactionsProvider,
  useTransactions,
} from '@/contexts/TransactionContext';
import { Button } from '@/components';
import { formatDateAPI } from '@/utils/formatter';

function HistoryPage() {
  const {
    transactions,
    setTransactions,
    accountData,
    setAccountData,
    activeTransaction,
    setActiveTransaction,
    isLoading,
    setIsLoading,
    setShowModal,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
  } = useTransactions();
  const { token, userId, api } = useAuth();

  const [screenIsLarge, setScreenIsLarge] = useState<boolean>(
    window.innerWidth >= 1023 ? true : false
  );
  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1023) setScreenIsLarge(true);
      else setScreenIsLarge(false);
    });
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const transaction = e.currentTarget.getAttribute('data-transaction');
    const parsedTransaction = transaction ? JSON.parse(transaction) : null;
    setActiveTransaction(parsedTransaction);
  };

  const handleRemoveFilter = () => {
    setStartDate(new Date(0));
    setEndDate(new Date());
  };

  async function getTransactions(
    userId: string | null,
    startDate: string | null,
    endDate: string | null
  ) {
    setIsLoading(true);
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
        if (transactions) {
          setTransactions(transactions);
        } else setTransactions(null);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.code === 404) setTransactions(null);
        setIsLoading(false);
      });
  }

  const fetchData = async () => {
    try {
      const response = await api.get(`/api/bank-accounts/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAccountData(response.data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    setActiveTransaction(null);
    if (startDate && endDate) {
      const startDateString = formatDateAPI(startDate);
      const endDateString = formatDateAPI(endDate);

      getTransactions(userId, startDateString, endDateString);
    }
    fetchData();
  }, [token, userId, startDate, endDate]);

  return isLoading ? (
    <div className="absolute bottom-0 left-0 right-0 top-0">
      <Loading size="5vw" bgSize="100vh" />
    </div>
  ) : (
    <div className="relative flex flex-col gap-y-20 pr-20 lg:gap-y-10 sm:pl-6 sm:pr-6">
      <section className="flex flex-col gap-y-2.5">
        <h2
          className="font-Inter text-xl-body font-medium text-neutral-03"
          aria-label="akun"
        >
          AKUN
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-1 lg:gap-y-5">
          <div className="flex justify-self-start">
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

          <div className="flex w-max flex-col items-end gap-2 justify-self-end lg:flex-row lg:justify-self-start">
            <Button
              className="flex h-min w-max flex-row items-center justify-center gap-3 bg-primary-light-blue"
              aria-label="tombol filter"
              onClick={() => setShowModal(true)}
            >
              <div className="">
                <img
                  src="/images/icons/filter.svg"
                  alt=""
                  className="md:scale-75"
                />
              </div>
              <span className="text-xs-display font-bold text-primary-dark-blue">
                Filter
              </span>
            </Button>

            {startDate?.getTime() != 0 && endDate?.getTime() != 0 && (
              <Button
                className="flex h-min w-max flex-row items-center justify-center gap-3 bg-danger"
                aria-label="tombol hapus filter"
                onClick={handleRemoveFilter}
              >
                <div className="">
                  <img
                    src="/images/icons/close-icon.svg"
                    alt=""
                    className="scale-125"
                  />
                </div>
                <span className="text-xs-display text-white">Hapus Filter</span>
              </Button>
            )}
          </div>
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
          <div
            className={
              activeTransaction || !screenIsLarge
                ? 'flex w-full flex-col gap-y-[30px]'
                : 'flex w-1/2 flex-col gap-y-[30px]'
            }
          >
            <TransactionsList
              handleClick={handleClick}
              transactions={transactions}
              activeTransaction={activeTransaction}
            />
          </div>
          {activeTransaction && (
            <div className="w-full lg:hidden">
              <TransactionData />
            </div>
          )}
        </div>
        <FilterModal />
      </section>
      {activeTransaction && (
        <div className="fixed bottom-0 left-0 right-0 top-0 hidden items-center bg-white lg:flex">
          <TransactionData />
        </div>
      )}
    </div>
  );
}

export default function History() {
  return (
    <TransactionsProvider>
      <HistoryPage />
    </TransactionsProvider>
  );
}
