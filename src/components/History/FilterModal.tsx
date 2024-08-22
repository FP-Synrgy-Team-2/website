import useAuth from '@/hooks/useAuth';
import { useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import { TransactionProps } from '@/types/transaction';
import ButtonPrimary from '../General/ButtonPrimary';

type Value = CalendarProps['value'];

interface FilterModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTransactions: React.Dispatch<
    React.SetStateAction<TransactionProps[] | null>
  >;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
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

function FilterModal({
  showModal,
  setShowModal,
  setTransactions,
  setLoading,
}: FilterModalProps) {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const { token, userId, api } = useAuth();

  const handleApplyFilter = () => {
    setShowModal(false);
    if (startDate && endDate)
      if (endDate < startDate) {
        alert('Tanggal akhir tidak boleh lebih kecil dari tanggal awal');
        setShowModal(true);
        return;
      } else {
        getTransactions(
          userId,
          startDate.toLocaleDateString('en-CA'),
          endDate.toLocaleDateString('en-CA')
        );
      }
  };

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

  async function getTransactions(
    userId: string | null,
    startDate: string | null,
    endDate: string | null
  ) {
    let transactions: null | TransactionProps[] = null;
    setLoading(true);
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
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.code === 404) setTransactions(null);
        setLoading(false);
      });
  }

  if (showModal)
    return (
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
    );
}

export default FilterModal;
