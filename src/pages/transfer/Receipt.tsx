import { Breadcrumbs, Button } from '@/components';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface TransactionData {
  account_id: string;
  beneficiary_account: string;
  amount: number;
  admin_fee: number;
  note: string;
  total: number;
}

const Receipt: React.FC = () => {
  const navigate = useNavigate();
  const breadcrumbs = [
    { label: 'Transfer', path: '/transfer' },
    { label: 'Input Data Transfer', path: '/transfer/new' },
  ];

  const formatNumber = (num: number): string => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  };

  const { id } = useParams<{ id: string }>();
  const transactionId = id || '';

  const handleDownload = () => {
    console.log('Download receipt');
    navigate(`/transfer/invoice/${transactionId}`);
  };

  const URL = import.meta.env.VITE_API_URL;
  const [data, setData] = useState<TransactionData | null>(null);
  const [beneficiary_name, setBeneficiaryName] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionResponse = await axios.get(
          `${URL}/transaction/${transactionId}`
        );
        const transactionData = transactionResponse.data;

        if (transactionData.beneficiary_account) {
          const bankAccountResponse = await axios.get(
            `${URL}/bank-accounts/account/${transactionData.beneficiary_account}`
          );
          const bankAccountData = bankAccountResponse.data;
          setBeneficiaryName(bankAccountData.owner_name || '');
        }
        setData(transactionData);
      } catch (error) {
        console.error('Error fetching invoice data:', error);
      }
    };
    fetchData();
  }, [URL, transactionId]);

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
            <p>10 Juni 2024</p>
            <div className="h-[10px] w-[10px] rounded-full bg-dot-grey"></div>
            <p>10.30</p>
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
          {data && beneficiary_name && (
            <div className="mx-auto text-dark-grey">
              <p className="my-3">{data.account_id}</p>
              <p className="my-3">{data.beneficiary_account}</p>
              <p className="my-3">{beneficiary_name}</p>
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
          <Button
            color="primary-dark-blue"
            className="h-[52] w-[167px] rounded-[30px] border border-primary-dark-blue bg-white px-10 py-3 font-bold text-primary-dark-blue"
          >
            Kembali
          </Button>
          <Button
            color="primary-dark-blue"
            className="flex h-[52] w-[167px] items-center justify-center gap-4 rounded-[30px] border border-primary-dark-blue px-10 py-3 font-bold text-white"
            onClick={handleDownload}
          >
            <img src="/images/icons/download.svg" alt="" /> Unduh
          </Button>
        </div>
      </div>
    </>
  );
};

export default Receipt;
