import { useParams } from 'react-router-dom';
import { NavbarLogo } from '@/components';
import axios from 'axios';
import { useEffect, useState, forwardRef } from 'react';

const Invoice = forwardRef<HTMLDivElement, { onDataLoaded: () => void }>(
  (props, ref) => {
    const URL = import.meta.env.VITE_API_URL;
    const { id } = useParams();
    const [senderAccount, setSenderAccount] = useState<string | null>(null);
    const [receiverAccount, setReceiverAccount] = useState<string | null>(null);
    const [receiverName, setReceiverName] = useState<string | null>(null);
    const [amount, setAmount] = useState<number>(0);
    const [adminFee, setAdminFee] = useState<number>(0);
    const [transactionDate, setTransactionDate] = useState<string | null>(null);
    const [note, setNote] = useState<string | null>(null);
    const [total, setTotal] = useState<number>(0);
    const [dataLoaded, setDataLoaded] = useState<boolean>(false);

    function formatRupiah(amount: number): string {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    }

    useEffect(() => {
      const fetchData = async () => {
        try {
          const transactionResponse = await axios.get(
            `${URL}/transaction/${id}`
          );
          const transactionData = transactionResponse.data;

          setSenderAccount(transactionData.account_id || '');
          setReceiverAccount(transactionData.beneficiary_account || '');
          setTransactionDate(transactionData.transaction_date || '');
          setAmount(transactionData.amount || 0);
          setAdminFee(transactionData.admin_fee || 0);
          setNote(transactionData.note || '');
          setTotal(transactionData.total || 0);

          if (transactionData.beneficiary_account) {
            const bankAccountResponse = await axios.get(
              `${URL}/bank-accounts/account/${transactionData.beneficiary_account}`
            );
            const bankAccountData = bankAccountResponse.data;

            setReceiverName(bankAccountData.owner_name || '');
          }

          // Notify parent that data is loaded
          setDataLoaded(true);
          if (props.onDataLoaded) props.onDataLoaded();
        } catch (error) {
          console.error('Error fetching invoice data:', error);
        }
      };

      fetchData();
    }, [id, URL, props, dataLoaded]);

    return (
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
                <div className="">{senderAccount}</div>
                <div className="">{receiverAccount}</div>
                <div className="">{receiverName}</div>
                <div className="">{formatRupiah(amount)}</div>
                <div className="">{formatRupiah(adminFee)}</div>
                <div className="">{note}</div>
                <div className="">{transactionDate}</div>
                <div className="font-bold">{formatRupiah(total)}</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
);

export default Invoice;
