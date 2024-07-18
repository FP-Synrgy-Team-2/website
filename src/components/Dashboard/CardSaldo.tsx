import { useState } from 'react';
import CopyIcon from '@/assets/icons/Copy_alt.png';
import HideEye from '@/assets/icons/hide_eye_fill.svg';
import ShowEye from '@/assets/icons/show_eye.svg';

const CardSaldo: React.FC = () => {
  const [isSaldoHidden, setIsSaldoHidden] = useState<boolean>(false);
  const [accountNumber] = useState<string>('1234567890');
  const [isCopySuccess, setIsCopySuccess] = useState<boolean>(false);

  const saldo: string = formatNumber(12321313);

  function handleSaldoClick(): void {
    setIsSaldoHidden(!isSaldoHidden);
  }

  function handleCopyClick(): void {
    navigator.clipboard
      .writeText(accountNumber)
      .then(() => {
        setIsCopySuccess(true);
        setTimeout(() => {
          setIsCopySuccess(false);
        }, 1000);
      })
      .catch((err) => {
        console.error('Failed to copy account number: ', err);
      });
  }

  function formatNumber(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }

  return (
    <div
      className="h-52 w-96 rounded-[20px] bg-primary-blue"
      aria-label="Informasi saldo"
    >
      <div className="mx-auto flex h-full w-9/12 flex-col justify-center gap-7">
        <div className="text-neutral-01">
          <p className="text-sm-body font-thin" aria-label="Nomor rekening">
            Nomor Rekening
          </p>
          <div className="flex items-center gap-2">
            <h1
              className="text-xl-body font-bold"
              id="rekening"
              aria-label={accountNumber}
            >
              {accountNumber}
            </h1>
            <button
              className="relative cursor-pointer font-bold"
              onClick={handleCopyClick}
              aria-label="tombol salin rekening"
            >
              {isCopySuccess && (
                <span className="absolute left-0 top-[-22px] rounded bg-black px-1 py-1 text-xs">
                  copied
                </span>
              )}
              <img src={CopyIcon} alt="tombol salin rekening" />
            </button>
          </div>
        </div>
        <div className="text-neutral-01">
          <p className="text-sm-body font-thin" aria-label="Saldo">
            Saldo
          </p>
          <div className="flex gap-2">
            <p className="text-sm-body font-thin" aria-label={'Rp. ' + saldo}>
              Rp.{' '}
              <span className="text-xl-body font-bold" id="saldo">
                {isSaldoHidden ? '******' : saldo}
              </span>
            </p>
            <button
              className="cursor-pointer font-bold"
              onClick={handleSaldoClick}
            >
              {isSaldoHidden ? (
                <img
                  src={ShowEye}
                  alt="tombol tampilkan saldo"
                  aria-label="tombol tampilkan saldo"
                />
              ) : (
                <img
                  src={HideEye}
                  alt="tombol sembunyikan saldo"
                  aria-label="tombol sembunyikan saldo"
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSaldo;
