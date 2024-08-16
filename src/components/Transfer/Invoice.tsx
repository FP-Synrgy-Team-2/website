import { useParams } from 'react-router-dom';
import { NavbarLogo } from '@/components';
import { useEffect, useState, forwardRef } from 'react';
import useAuth from '@/hooks/useAuth';
import { getAccountNumber } from '@/utils/getUserData';
import formatRupiah from '@/utils/formatRupiah';
import { TransactionProps } from '@/types/transaction';

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
                <div>Rekening Sumber</div>
                <div>Rekening Tujuan</div>
                <div>Nama Penerima</div>
                <div>Nominal Transfer</div>
                <div>Biaya Admin</div>
                {data.note && <div>Catatan</div>}
                <div>Tanggal Transaksi</div>
                <div className="font-bold">Total</div>
              </div>
              <div className="receipt-value w-1/2">
                <div>{accountNumber}</div>
                <div>{data.to.account_number}</div>
                <div>{data.to.owner_name}</div>
                <div>{formatRupiah(data.amount)}</div>
                <div>{formatRupiah(data.admin_fee)}</div>
                {data.note && <div>{data.note}</div>}
                <div>
                  {formatDate(data.transaction_date)}{' '}
                  {formatHour(data.transaction_date)}
                </div>
                <div className="font-bold">{formatRupiah(data.total)}</div>
              </div>
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
