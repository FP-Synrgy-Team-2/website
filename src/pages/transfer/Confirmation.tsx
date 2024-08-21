import { useState } from 'react';
import { Breadcrumbs, ButtonPrimary, ButtonSecondary } from '@/components';
import PinInput from './Pin';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { getAccountId } from '@/utils/getUserData';
import moment from 'moment';

const ADMIN_FEE = 0;

type StateData = {
  balance: number;
  fromAccount: string;
  fromName: string;
  toAccount: string;
  toName: string;
  amount: number;
  note?: string;
  saved: boolean;
};

function Confirmation() {
  const {
    balance,
    amount,
    fromAccount,
    fromName,
    saved,
    toAccount,
    toName,
    note,
  } = useLocation().state as StateData;
  const [showPinInput, setShowPinInput] = useState(false);
  const { api, token } = useAuth();
  const navigate = useNavigate();

  const handlePinValidated = async () => {
    try {
      if (token) {
        const [sourceAccountId, beneficiaryAccountId] = await Promise.all([
          getAccountId(api, fromAccount, token),
          getAccountId(api, toAccount, token),
        ]);

        const transactionDate = moment()
          .utc()
          .format('YYYY-MM-DD HH:mm:ss.SSS');
        const { data } = await api.post(
          `/api/transactions`,
          {
            account_id: sourceAccountId,
            beneficiary_account: beneficiaryAccountId,
            amount,
            transaction_date: transactionDate,
            note,
            saved,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        navigate(`/transfer/receipt/${data.data.transaction_id}`, {
          replace: true,
        });
      }
    } catch (error) {
      console.error('Transfer failed:', error);
    }
  };

  const breadcrumbs = [
    { label: 'Transfer', path: 'transfer' },
    { label: 'Input Data Transfer', path: '/transfer/new' },
    { label: 'Konfirmasi Transaksi', path: '/transfer/confirm' },
  ];

  const handleClick = () => {
    setShowPinInput(true);
  };

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <section className="w-1/2 sm:mx-4 sm:w-auto">
        <h2 className="flex h-[76px] flex-row rounded-[10px] bg-primary-light-blue p-3">
          <div className="flex basis-1/2 items-center gap-2">
            <span className="inline-flex size-11 items-center justify-center rounded-full bg-primary-blue font-bold text-white">
              {fromName[0]}
            </span>
            <span
              className="self-center text-[24px]"
              tabIndex={0}
              aria-label={'Nama pemilik rekening: ' + fromName}
            >
              {fromName}
            </span>
          </div>
          <div className="grid basis-1/2 justify-items-end self-center">
            <div className="text-xl" tabIndex={0}>
              {Math.abs(balance).toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
              })}
            </div>
          </div>
        </h2>

        <table
          className="mt-[1.625rem] w-full table-fixed text-left"
          aria-labelledby="detail-transaction"
        >
          <caption
            className="flex items-center border-b border-opacity-20 text-dark-grey"
            aria-label="Rincian Transaksi"
            id="detail-transaction"
          >
            Rincian Transaksi
          </caption>
          <tbody className="mb-5 mt-3.5 flex flex-col gap-[1rem]">
            {[
              ['Rekening Sumber', fromAccount],
              ['Rekening Tujuan', toAccount],
              ['Nama Penerima', toName],
              [
                'Nominal Transfer',
                Math.abs(amount).toLocaleString('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }),
              ],
              [
                'Biaya Admin',
                ADMIN_FEE.toLocaleString('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }),
              ],
              ['Catatan', note],
            ].map((r, i) => (
              <tr
                key={i}
                className="text-left sm:flex sm:items-center sm:justify-start"
              >
                <th className="w-[16.375rem] font-normal sm:w-40">{r[0]}</th>
                <td className="text-dark-grey">{r[1]}</td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="flex h-[3.75rem] items-center justify-between rounded-xl bg-primary-light-blue px-[0.9375rem] py-2.5">
              <th className="font-normal">Total</th>
              <td>
                {Math.abs(ADMIN_FEE + amount).toLocaleString('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                })}
              </td>
            </tr>
          </tfoot>
        </table>

        <div className="mt-3 flex justify-end gap-[1.875rem] font-bold">
          <ButtonSecondary className="h-12 w-48" onClick={() => navigate(-1)}>
            Kembali
          </ButtonSecondary>
          <ButtonPrimary
            className="flex h-12 w-48 items-center justify-center gap-2.5"
            onClick={handleClick}
          >
            Kirim
            <span>
              <img src="/images/icons/send.svg" className="img-white" alt="" />
            </span>
          </ButtonPrimary>
        </div>
      </section>
      {showPinInput && (
        <PinInput
          showPinInput={showPinInput}
          closePinInput={() => setShowPinInput(false)}
          onPinValidated={handlePinValidated}
          data={{
            amount,
            balance,
            fromAccount,
            fromName,
            saved,
            toAccount,
            toName,
            note,
          }}
        />
      )}
    </>
  );
}

export default Confirmation;
