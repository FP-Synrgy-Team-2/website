import { Breadcrumbs, ButtonPrimary, ButtonSecondary } from '@/components';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { getAccountNumber } from '@/utils/getUserData';

interface BeneficiaryAccount {
  account_id: string;
  account_number: string;
  owner_name: string;
}

interface TransactionData {
  account_id: string;
  beneficiary_account: BeneficiaryAccount;
  amount: number;
  admin_fee: number;
  note: string;
  total: number;
  transaction_date: Date;
}

const Receipt: React.FC = () => {
  const navigate = useNavigate();
  const { api: axios, token, userId } = useAuth();
  const [accountNumber, setAccountNumber] = useState<string | null>(null);

  const breadcrumbs = [
    { label: 'Transfer', path: '/transfer' },
    { label: 'Input Data Transfer', path: '/transfer/new' },
  ];

  const formatDate = (date: Date): string => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(newDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const formatHour = (date: Date): string => {
    const newDate = new Date(date);
    const hours = String(newDate.getHours()).padStart(2, '0');
    const minutes = String(newDate.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
  };

  const formatNumber = (num: number): string => {
    if (num === 0) return '0';
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  };

  const { id } = useParams<{ id: string }>();
  const transactionId = id || '';

  const handleDownload = () => {
    navigate(`/transfer/invoice/${transactionId}`);
  };

  const [data, setData] = useState<TransactionData | null>(null);

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
        setAccountNumber(accountNumber.account_number);
        setData(transactionData);
      } catch (error) {
        console.error('Error fetching invoice data:', error);
      }
    };
    fetchData();
  }, [transactionId, axios, token, userId]);

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="container w-[638px] rounded-[20px] border border-grey p-8 shadow-2xl">
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
            <p>{data ? formatDate(data.transaction_date) : '-'}</p>
            <div className="h-[10px] w-[10px] rounded-full bg-dot-grey"></div>
            <p>{data ? formatHour(data.transaction_date) : '-'}</p>
          </div>
        </div>

        <div className="border-b-4 border-grey"></div>

        <div className="mt-3 flex gap-[40px] p-3 text-lg">
          <div className="text-muted-black">
            <p className="my-3">Rekening Sumber</p>
            <p className="my-3">Rekening Tujuan</p>
            <p className="my-3">Nama penerima</p>
            <p className="my-3">Nominal Transfer</p>
            <p className="my-3">Biaya Admin</p>
            <p className="my-3">Catatan</p>
            <p className="my-3">Total</p>
          </div>
          {data && data.beneficiary_account.owner_name && (
            <div className="mx-auto text-dark-grey">
              <p className="my-3">{accountNumber}</p>
              <p className="my-3">{data.beneficiary_account.account_number}</p>
              <p className="my-3">{data.beneficiary_account.owner_name}</p>
              <p className="my-3">Rp {formatNumber(data.amount)}</p>
              <p className="my-3">Rp {formatNumber(data.admin_fee)}</p>
              <p className="my-3">{data.note}</p>
              <p className="my-3">Rp {formatNumber(data.total)}</p>
            </div>
          )}
        </div>

        <div className="border-b-2 border-grey"></div>

        <div className="mb-5 flex gap-[144px] p-3 text-lg">
          <div className="text-muted-black">
            <p className="my-3">Catatan</p>
            <p className="my-3">Total</p>
          </div>
          {data && (
            <div className="mx-auto text-dark-grey">
              <p className="my-3">{data.note}</p>
              <p className="my-3">Rp {formatNumber(data.total)}</p>
            </div>
          )}
        </div>
      </div>
      <div className="my-5 flex p-3">
        <div className="flex gap-7 self-center">
          <ButtonSecondary className="h-[52] w-[167px] rounded-[30px]">
            Kembali
          </ButtonSecondary>
          <ButtonPrimary
            className="flex h-[52] w-[167px] items-center justify-center gap-4 rounded-[30px]"
            onClick={handleDownload}
          >
            <img src="/images/icons/download.svg" alt="" /> Unduh
          </ButtonPrimary>
        </div>
      </div>
    </>
  );
};

export default Receipt;
