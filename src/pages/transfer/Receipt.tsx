<<<<<<< HEAD
/* eslint-disable prettier/prettier */
import { useParams } from 'react-router-dom';
import { NavbarLogo } from '../../components';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Receipt() {
    const URL = import.meta.env.VITE_API_URL;
    const { id } = useParams();
    const [senderAccount, setSenderAccount] = useState(null);
    const [receiverAccount, setReceiverAccount] = useState(null);
    const [receiverName, setReceiverName] = useState(null);
    const [amount, setAmount] = useState(0);
    const [adminFee, setAdminFee] = useState(0);
    const [transactionDate, setTransactionDate] = useState(null);
    const [note, setNote] = useState(null);
    const [total, setTotal] = useState(0);

    function formatRupiah(amount: number): string {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    }

    useEffect(() => {
        // axios get /transaction/:id
        axios
            .get(`${URL}/transaction/${id}`)
            .then((res) => {
                const result = res.data;

                setSenderAccount(result.account_id);
                setReceiverAccount(result.beneficiary_account);
                // setReceiverName(result.nama_tujuan);
                setTransactionDate(result.transaction_date);
                setAmount(result.amount);
                setAdminFee(result.admin_fee);
                setNote(result.note);
                setTotal(result.total);
            })
            .catch((err) => {
                console.error(err);
            });

        // axios get bank-accounts/:account_number
        axios
            .get(`${URL}/bank-accounts/${receiverAccount}`)
            .then((res) => {
                const result = res.data;

                setReceiverName(result.owner_name);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [
        senderAccount,
        receiverAccount,
        receiverName,
        amount,
        adminFee,
        transactionDate,
        note,
        total,
    ]);

    return (
        <>
            <div className='w-[90vw] mx-auto pt-6 z-10'>
                <div className='w-100 relative mb-6'>
                    <NavbarLogo className='h-[90px] w-fit' />
                    <img className='max-lg:hidden absolute top-0 right-0'
                        src="/images/transfer/invoice.png" alt="" aria-hidden={true} />
                </div>
                <h1 className='text-md-display font-bold'>
                    Invoice Transfer
                </h1>
                <h2 className='text-xs-display font-regular'>
                    Invoice ini merupakan bukti pembayaran yang sah
                </h2>
                <div className='mt-6 grid grid-cols-2 gap-4 max-w-[50vw]'>
                    <div className="receipt-label">Rekening Sumber</div>
                    <div className="receipt-value">{senderAccount}</div>
                    <div className="receipt-label">Rekening Tujuan</div>
                    <div className="receipt-value">{receiverAccount}</div>
                    <div className="receipt-label">Nama Penerima</div>
                    <div className="receipt-value">{receiverName}</div>
                    <div className="receipt-label">Nominal Transfer</div>
                    <div className="receipt-value">{formatRupiah(amount)}</div>
                    <div className="receipt-label">Biaya Admin</div>
                    <div className="receipt-value">{formatRupiah(adminFee)}</div>
                    <div className="receipt-label">Catatan</div>
                    <div className="receipt-value">{note}</div>
                    <div className="receipt-label">Tanggal Transaksi</div>
                    <div className="receipt-value">{transactionDate}</div>
                    <div className="receipt-label font-bold">Total</div>
                    <div className="receipt-value font-bold">{formatRupiah(total)}</div>
                </div>
            </div>
        </>
    );
=======
function Receipt() {
  return (
    <div>
      <h1>Receipt</h1>
    </div>
  );
>>>>>>> 8b0d6cb (feat: fix formatting)
}

export default Receipt;
