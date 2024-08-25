import { useTransactions } from '@/contexts/TransactionContext';
import useAuth from '@/hooks/useAuth';
import Calendar, { CalendarProps } from 'react-calendar';
import { TransactionProps } from '@/types/transaction';
import { ButtonPrimary } from '@/components';
import { useState } from 'react';

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

function FilterModal() {
  const { token, userId, api } = useAuth();
  const {
    showModal,
    setShowModal,
    setTransactions,
    setIsLoading,
    startDate: startDateGlobal,
    setStartDate: setStartDateGlobal,
    endDate: endDateGlobal,
    setEndDate: setEndDateGlobal,
  } = useTransactions();

  const [startDate, setStartDate] = useState<Date | null>(startDateGlobal);
  const [endDate, setEndDate] = useState<Date | null>(endDateGlobal);

  const handleApplyFilter = () => {
    setShowModal(false);
    if (startDate && endDate)
      if (endDate < startDate) {
        alert('Tanggal akhir tidak boleh lebih kecil dari tanggal awal');
        setShowModal(true);
        return;
      } else {
        setStartDateGlobal(startDate);
        setEndDateGlobal(endDate);

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
    setIsLoading(true);
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

  if (showModal)
    return (
      <div className="modal-container">
        <div className="modal-content relative">
          <span
            onClick={() => setShowModal(false)}
            className="absolute right-6 top-4 cursor-pointer"
          >
            <span className="not-sr-only">x</span>
            <span className="sr-only">Tutup filter</span>
          </span>

          <h2 className="mb-6 text-center text-xl font-semibold">
            Filter Mutasi
          </h2>
          <div className="modal-content-grid mb-6">
            <div className="calendar-container">
              <label htmlFor="startDate">Tanggal Mulai</label>
              <Calendar
                onChange={handleDateChange(setStartDate)}
                value={startDate}
                className="react-calendar w-full"
              />
              <button className="mt-4 rounded border border-primary-dark-blue bg-white py-2 font-bold text-primary-dark-blue focus:outline-none">
                {formatDate(startDate)}
              </button>
            </div>
            <div className="calendar-container">
              <label htmlFor="endDate">Tanggal Akhir</label>
              <Calendar
                onChange={handleDateChange(setEndDate)}
                value={endDate}
                className="react-calendar w-full"
              />
              <button className="mt-4 rounded border border-primary-dark-blue bg-white py-2 font-bold text-primary-dark-blue focus:outline-none">
                {formatDate(endDate)}
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <ButtonPrimary onClick={handleApplyFilter}>
              Gunakan Filter
            </ButtonPrimary>
          </div>
        </div>
      </div>
    );
}

export default FilterModal;
