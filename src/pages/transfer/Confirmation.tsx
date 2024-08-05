import { useState } from 'react';
import { Breadcrumbs } from '@/components';
import PinInput from './Pin';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { getAccountId } from '@/utils/getUserData';

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
    const now = new Date();
    try {
      if (token) {
        const [sourceAccountId, beneficiaryAccountId] = await Promise.all([
          getAccountId(api, fromAccount, token),
          getAccountId(api, toAccount, token),
        ]);

        const { data } = await api.post(
          `/api/transactions`,
          {
            account_id: sourceAccountId,
            beneficiary_account: beneficiaryAccountId,
            amount,
            transaction_date:
              now.toISOString().slice(0, 10) +
              ' ' +
              now.toLocaleTimeString().slice(0, 8),
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
    <div className="px-[2.6875rem] py-[4.625rem]">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <section className="w-[31.875rem] pt-12">
        <h2 className="flex h-[76px] flex-row rounded-[10px] bg-primary-light-blue p-3">
          <div className="flex basis-1/2 items-center gap-[20px]">
            <div className="flex h-[45px] w-[45px] items-center justify-center rounded-full bg-primary-blue font-bold text-white">
              <span className="text-2xl">{fromName[0]}</span>
            </div>
            <span className="self-center text-[24px]">{fromName}</span>
          </div>
          <div className="grid basis-1/2 justify-items-end self-center">
            <div className="text-xl">
              {Math.abs(balance).toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
              })}
            </div>
          </div>
        </h2>

        <table className="mt-[1.625rem] w-full text-left text-2xl">
          <caption className="flex h-[3.8125rem] items-center border-b border-opacity-20 text-dark-grey">
            Rincian Transaksi
          </caption>
          <tbody className="mb-5 mt-3.5 flex flex-col gap-[1.6875rem]">
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
              <tr key={i} className="flex text-left">
                <th className="w-[16.375rem] font-normal">{r[0]}</th>
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

        <div className="mt-[4.4375rem] flex justify-end gap-[1.875rem] text-2xl font-bold">
          <button
            className="h-[3.25rem] w-[10.4375rem] rounded-[1.875rem] border border-primary-dark-blue bg-white text-primary-dark-blue"
            onClick={() => navigate(-1)}
          >
            Kembali
          </button>
          <button
            className="flex h-[3.25rem] w-[10.4375rem] items-center justify-center gap-2.5 rounded-[1.875rem] bg-primary-dark-blue text-white"
            onClick={handleClick}
          >
            Kirim
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 12H3"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.7152 11.7966L16.265 7.90356C15.7355 7.52535 15 7.90385 15 8.55455V15.4454C15 16.0961 15.7355 16.4746 16.265 16.0964L21.7152 12.2034C21.8548 12.1037 21.8548 11.8963 21.7152 11.7966Z"
                  fill="#FFFFFF"
                />
              </svg>
            </span>
          </button>
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
    </div>
  );
}

export default Confirmation;
