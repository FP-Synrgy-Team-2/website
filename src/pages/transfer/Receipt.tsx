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
    const [amount, setAmount] = useState(null);
    const [adminFee, setAdminFee] = useState(null);
    const [transactionDate, setTransactionDate] = useState(null);
    const [note, setNote] = useState(null);

    useEffect(() => {
        // axios get /transaction/:id
        axios
            .get(`${URL}/transaction/${id}`)
            .then((res) => {
                const result = res.data;

                setSenderAccount(result.rekening_sumber);
                setReceiverAccount(result.rekening_tujuan);
                // setReceiverName(result.nama_tujuan);
                setTransactionDate(result.transaction_date);
                setAmount(result.amount);
                setAdminFee(result.biaya_admin);
                setNote(result.note);
            })
            .catch((err) => {
                console.error(err);
            });

        // axios get bank-accounts/:account_number
        axios
            .get(`${URL}/bank-accounts/${receiverAccount}`)
            .then((res) => {
                const result = res.data;

                setReceiverName(result.nama);
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
    ]);

    return (
        <>
            <NavbarLogo />
        </>
    );
}

export default Receipt;
