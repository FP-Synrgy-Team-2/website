import { Breadcrumbs, ButtonPrimary, ButtonSecondary } from '@/components';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { getAccountNumber } from '@/utils/getUserData';
import { TransactionProps } from '@/types/transaction';

const Receipt: React.FC = () => {
  const navigate = useNavigate();
  const { api: axios, token, userId } = useAuth();
  const [accountNumber, setAccountNumber] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();
  const transactionId = id || '';
  const [data, setData] = useState<TransactionProps | null>(null);

  const breadcrumbs = [
    { label: 'Transfer', path: '/transfer' },
    { label: 'Input Data Transfer', path: '/transfer/new' },
  ];

  const formatDate = (date: string): string => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(newDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const formatHour = (date: string): string => {
    const newDate = new Date(date);
    const hours = String(newDate.getHours()).padStart(2, '0');
    const minutes = String(newDate.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
  };

  const formatNumber = (num: number): string => {
    if (num === 0) return '0';
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  };

  const handleDownload = () => {
    navigate(`/transfer/invoice/${transactionId}`);
  };

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
      } catch (error) {
        console.error('Error fetching invoice data:', error);
      }
    };
    fetchData();
  }, [transactionId, axios, token, userId]);

  const rows = data
    ? [
        { label: 'Rekening Sumber', value: accountNumber },
        { label: 'Rekening Tujuan', value: data.to.account_number },
        { label: 'Nama penerima', value: data.to.owner_name },
        { label: 'Nominal Transfer', value: `Rp ${formatNumber(data.amount)}` },
        { label: 'Biaya Admin', value: `Rp ${formatNumber(data.admin_fee)}` },
        { label: 'Catatan', value: data.note },
        { label: 'Total', value: `Rp ${formatNumber(data.total)}` },
      ]
    : [];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="w-[638px] sm:mx-4 sm:w-auto">
        {data ? (
          <div className="rounded-[20px] border border-grey p-8 shadow-2xl sm:p-4">
            <div className="my-3 flex flex-col items-center p-3">
              <div className="my-2 flex h-[70px] w-[70px] rounded-full bg-success">
                <img
                  src="/images/icons/checklist.png"
                  alt="Berhasil"
                  className="m-auto"
                />
              </div>
              <h1 className="text-lg font-bold">Tranksaksi Berhasil</h1>
              <div className="my-2 flex items-center gap-[15px] text-lg text-dark-grey">
                <p>{formatDate(data.transaction_date)}</p>
                <div className="h-[10px] w-[10px] rounded-full bg-dot-grey"></div>
                <p>{formatHour(data.transaction_date)}</p>
              </div>
            </div>
            <div className="border-b-4 border-grey"></div>
            <div className="mb-3 p-3 text-lg sm:p-0 sm:pt-2">
              <table className="w-full table-fixed">
                <tbody>
                  {rows.slice(0, 5).map((row, index) => (
                    <tr
                      key={index}
                      className="mb-2 text-left sm:flex sm:items-center sm:justify-start"
                    >
                      <th className="w-50 text-muted-black sm:w-40">
                        {row.label}
                      </th>
                      <td className="w-50 text-dark-grey">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mb-3 border-t-2 border-grey p-3 sm:p-0 sm:pt-2">
              <table className="w-full table-fixed">
                <tbody>
                  {rows.slice(5).map((row, index) => (
                    <tr
                      key={index}
                      className="mb-2 text-left sm:flex sm:items-center sm:justify-start"
                    >
                      <th className="w-50 text-muted-black sm:w-40">
                        {row.label}
                      </th>
                      <td className="w-50 text-dark-grey">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p>Memuat data</p>
        )}

        <div className="mt-5 flex p-3">
          <div className="flex gap-7 self-center">
            <Link to="/dashboard">
              <ButtonSecondary className="h-[52] w-[167px] rounded-[30px]">
                Dashboard
              </ButtonSecondary>
            </Link>
            <ButtonPrimary
              className="flex h-[52] w-[167px] items-center justify-center gap-4 rounded-[30px]"
              onClick={handleDownload}
            >
              <img src="/images/icons/download.svg" alt="" /> Unduh
            </ButtonPrimary>
          </div>
        </div>
      </div>
    </>
  );
};

export default Receipt;
