import { useParams } from 'react-router-dom';
import { NavbarLogo } from '@/components';
import { useEffect, useState, forwardRef } from 'react';
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

const Invoice = forwardRef<HTMLDivElement, { onDataLoaded: () => void }>(
  (props, ref) => {
    const { id } = useParams<{ id: string }>();
    const { api: axios, token, userId } = useAuth();
    const transactionId = id || '';
    const [accountNumber, setAccountNumber] = useState<string | null>(null);
    const [data, setData] = useState<TransactionData>({
      account_id: '',
      beneficiary_account: {
        account_id: '',
        account_number: '',
        owner_name: '',
      },
      amount: 0,
      admin_fee: 0,
      note: '',
      total: 0,
      transaction_date: new Date(),
    });
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);

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
    }, [URL, transactionId, axios, token]);

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
            <div className="mt-6 flex max-w-[50vw] gap-4">
              <div className="receipt-label w-1/2">
                <div className="">Rekening Sumber</div>
                <div className="">Rekening Tujuan</div>
                <div className="">Nama Penerima</div>
                <div className="">Nominal Transfer</div>
                <div className="">Biaya Admin</div>
                <div className="">Catatan</div>
                <div className="">Tanggal Transaksi</div>
                <div className="font-bold">Total</div>
              </div>
              <div className="receipt-value w-1/2">
                <div className="">{accountNumber}</div>
                <div className="">
                  {data.beneficiary_account.account_number}
                </div>
                <div className="">{data.beneficiary_account.owner_name}</div>
                <div className="">Rp {formatNumber(data.amount)}</div>
                <div className="">Rp {formatNumber(data.admin_fee)}</div>
                <div className="">{data.note}</div>
                <div className="">
                  {formatDate(data.transaction_date)}{' '}
                  {formatHour(data.transaction_date)}
                </div>
                <div className="font-bold">Rp {formatNumber(data.total)}</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    ) : (
      <p>Data transaksi tidak tersedia</p>
    );
  }
);

export default Invoice;
