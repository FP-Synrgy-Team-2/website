import { useParams } from 'react-router-dom';
import { NavbarLogo } from '@/components';
import { useEffect, useState, forwardRef } from 'react';
import useAuth from '@/hooks/useAuth';
import { getAccountNumber } from '@/utils/getUserData';
import { TransactionProps } from '@/types/transaction';
const formatHour = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleTimeString('id-ID', { hour12: false }).slice(0, -3);
};

const formatDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const Invoice = forwardRef<HTMLDivElement, { onDataLoaded: () => void }>(
  (props, ref) => {
    const { id } = useParams<{ id: string }>();
    const { api: axios, token, userId } = useAuth();
    const transactionId = id || '';
    const [accountNumber, setAccountNumber] = useState<string | null>(null);
    const [data, setData] = useState<TransactionProps>({
      from: {
        account_id: '',
        account_number: '',
        owner_name: '',
      },
      to: {
        account_id: '',
        account_number: '',
        owner_name: '',
      },
      amount: 0,
      admin_fee: 0,
      note: '',
      total: 0,
      transaction_date: '',
      transaction_id: '',
      type: '',
    });
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const transactionResponse = await axios.get(
            `/api/transactions/${transactionId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const transactionData = transactionResponse.data.data;
          const [accountNumber] = await Promise.all([
            getAccountNumber(axios, userId, token),
          ]);
          setAccountNumber(accountNumber);
          setData(transactionData);

          // Notify parent that data is loaded
          setDataLoaded(true);
          if (props.onDataLoaded) props.onDataLoaded();
        } catch (error) {
          console.error('Error fetching invoice data:', error);
          setDataLoaded(false);
        }
      };
      fetchData();
    }, [transactionId, axios, token, userId, props]);

    const formatNumber = (num: number): string => {
      if (num === 0) return '0';
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    };

    const rows = data
      ? [
          { label: 'Rekening Sumber', value: accountNumber },
          { label: 'Rekening Tujuan', value: data.to.account_number },
          { label: 'Nama penerima', value: data.to.owner_name },
          {
            label: 'Nominal Transfer',
            value: `Rp ${formatNumber(data.amount)}`,
          },
          { label: 'Biaya Admin', value: `Rp ${formatNumber(data.admin_fee)}` },
          { label: 'Catatan', value: data.note },
          {
            label: 'Tanggal Transaksi',
            value: `${formatDate(data.transaction_date) + ' ' + formatHour(data.transaction_date)}`,
          },
          { label: 'Total', value: `Rp ${formatNumber(data.total)}` },
        ]
      : [];

    return dataLoaded ? (
      <div ref={ref} className="h-[600px] w-[1150px]">
        <main
          className="relative h-full w-full bg-body-blue px-10"
          id="receipt"
        >
          <div className="z-10 mx-auto pt-6">
            <div className="w-100 relative mb-6">
              <NavbarLogo className="h-[90px] w-fit" />
              <img
                className="max-lg:hidden absolute right-0 top-0"
                src="/images/transfer/invoice.png"
                alt=""
                aria-hidden={true}
              />
            </div>
            <h1 className="text-md-display font-bold">Invoice Transfer</h1>
            <h2 className="text-xs-display font-regular">
              Invoice ini merupakan bukti pembayaran yang sah
            </h2>
            <div className="mt-3 w-1/2 text-lg-body font-regular text-dark-grey">
              <table className="w-full table-fixed">
                <tbody>
                  {rows.slice(0, 5).map((row, index) => (
                    <tr
                      key={index}
                      className="mb-2 text-left sm:flex sm:items-center sm:justify-start"
                    >
                      <th className="w-50 font-regular sm:w-40">{row.label}</th>
                      <td className="w-50 font-regular">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-1/2 text-lg-body font-regular text-dark-grey">
              <table className="w-full table-fixed">
                <tbody>
                  {rows.slice(5).map((row, index) => (
                    <tr
                      key={index}
                      className="mb-2 text-left sm:flex sm:items-center sm:justify-start"
                    >
                      <th className="w-50 font-regular sm:w-40">{row.label}</th>
                      <td className="w-50 font-regular">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    ) : (
      <p>Memuat data</p>
    );
  }
);

export default Invoice;
