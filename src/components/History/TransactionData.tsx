import { ButtonPrimary, ButtonSecondary } from '@/components';
import { useNavigate } from 'react-router-dom';
import { formatRupiah } from '@/utils/formatter';
import { useTransactions } from '@/contexts/TransactionContext';

function TransactionData() {
  const navigate = useNavigate();
  const { activeTransaction, setActiveTransaction } = useTransactions();

  const handleClose = () => {
    setActiveTransaction(null);
  };

  const handleDownload = () => {
    if (activeTransaction)
      navigate(`/transfer/invoice/${activeTransaction.transaction_id}`);
  };

  const formatHour = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleTimeString('id-ID', { hour12: false }).slice(0, -3);
  };

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('id-ID', { dateStyle: 'full' });
  };

  return (
    <>
      {activeTransaction && (
        <div className="sticky top-[20px] flex w-full flex-col items-center gap-5">
          <div className="flex h-max items-center justify-center rounded-[20px] bg-white px-[30px] py-[60px] shadow-[0_4px_5px_5px_#EAF6FF] xl:px-5 xl:py-[45px] sm:px-[15px] sm:py-[30px]">
            <div className="flex flex-col items-center gap-y-5">
              <div className="flex w-[447px] flex-col items-center xl:w-max">
                <div className="flex h-12.5 w-12.5 items-center justify-center rounded-[25px] bg-success">
                  <img
                    src="/images/icons/checklist.png"
                    alt=""
                    className="w-[22.5px]"
                  />
                </div>
                <span
                  tabIndex={2}
                  className="text-center text-xl-body font-bold"
                >
                  Transaksi Berhasil
                </span>
                <div className="flex items-center gap-x-2" tabIndex={2}>
                  <span className="text-sm-body text-dark-grey">
                    {formatDate(activeTransaction.transaction_date)}
                  </span>
                  <div className="h-2.5 w-2.5 rounded-[5px] bg-dot-grey"></div>
                  <span className="text-sm-body text-dark-grey">
                    {formatHour(activeTransaction.transaction_date)}
                  </span>
                </div>
              </div>
              <div className="h-0 w-full rounded-[3px] border-[3px] border-neutral-03 border-opacity-30"></div>
              <div className="grid w-full grid-cols-[auto_auto] gap-x-[7.5px] gap-y-[15px] px-[10px] text-xl-body sm:gap-x-[2.5px] sm:text-md-body">
                <span tabIndex={2} className="text-muted-black">
                  Rekening Sumber
                </span>
                <span tabIndex={2} className="text-dark-grey">
                  {activeTransaction.from.account_number}
                </span>
                <span tabIndex={2} className="text-muted-black">
                  Rekening Tujuan
                </span>
                <span tabIndex={2} className="text-dark-grey">
                  {activeTransaction.to.account_number}
                </span>
                <span tabIndex={2} className="text-muted-black">
                  Nama penerima
                </span>
                <span tabIndex={2} className="text-dark-grey">
                  {activeTransaction.to.owner_name}
                </span>
                <span tabIndex={2} className="text-muted-black">
                  Nominal Transfer{' '}
                </span>
                <span tabIndex={2} className="text-dark-grey">
                  {formatRupiah(activeTransaction.amount)}
                </span>
                <span tabIndex={2} className="text-muted-black">
                  Biaya Admin
                </span>
                <span tabIndex={2} className="text-dark-grey">
                  {formatRupiah(activeTransaction.admin_fee)}
                </span>
                <span tabIndex={2} className="text-muted-black">
                  Catatan
                </span>
                <span tabIndex={2} className="text-dark-grey">
                  {activeTransaction.note}
                </span>
                <span tabIndex={2} className="font-bold text-muted-black">
                  Total
                </span>
                <span tabIndex={2} className="font-bold text-dark-grey">
                  {formatRupiah(activeTransaction.total)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-x-4">
            <ButtonSecondary
              tabIndex={2}
              onClick={handleClose}
              className="hidden bg-white lg:flex"
            >
              Tutup
            </ButtonSecondary>
            <ButtonPrimary
              tabIndex={2}
              className="flex items-center gap-5 rounded-[10px]"
              onClick={handleDownload}
            >
              <img src="/images/icons/download.svg" alt="" />
              <span>
                Unduh <span className="sr-only">invoice</span>{' '}
              </span>
            </ButtonPrimary>
          </div>
        </div>
      )}
    </>
  );
}

export default TransactionData;
