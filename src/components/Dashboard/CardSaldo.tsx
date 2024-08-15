import { useState } from 'react';

type AccountData = {
  account_number: string;
  balance: number;
};

type CardSaldoProps = {
  accountData: AccountData;
};

const CardSaldo: React.FC<CardSaldoProps> = ({ accountData }) => {
  const [isSaldoHidden, setIsSaldoHidden] = useState<boolean>(false);
  const [isCopySuccess, setIsCopySuccess] = useState<boolean>(false);

  const saldo: string = formatNumber(accountData.balance);

  function handleSaldoClick(): void {
    setIsSaldoHidden(!isSaldoHidden);
  }

  function handleCopyClick(): void {
    navigator.clipboard
      .writeText(accountData.account_number)
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
    return String(num).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }

  return (
    <div
      className="h-50.25 w-96 rounded-[20px] bg-primary-blue sm:h-50.75 sm:w-85"
      aria-label="Informasi saldo"
    >
      <div className="mx-auto flex h-full w-9/12 flex-col justify-center gap-7">
        <div className="text-neutral-01">
          <p
            className="text-sm-body font-thin"
            aria-label="Nomor rekening"
            tabIndex={0}
          >
            Nomor Rekening
          </p>
          <div className="flex items-center justify-between gap-2">
            <h1
              tabIndex={0}
              className="text-xl-body font-bold"
              id="rekening"
              aria-label={'Nomor Rekening: ' + accountData.account_number}
            >
              {accountData.account_number}
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
              <img
                src="/images/icons/Copy_alt.png"
                alt="tombol salin rekening"
              />
            </button>
          </div>
        </div>
        <div className="text-neutral-01">
          <p className="text-sm-body font-thin" aria-label="Saldo" tabIndex={0}>
            Saldo
          </p>
          <div className="flex justify-between gap-2">
            <p
              className="text-sm-body font-thin"
              tabIndex={0}
              aria-label={'Rp. ' + saldo}
            >
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
                  src="/images/icons/eye_show.svg"
                  alt="tombol tampilkan saldo"
                  aria-label="tombol tampilkan saldo"
                />
              ) : (
                <img
                  src="/images/icons/eye_hide.svg"
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
