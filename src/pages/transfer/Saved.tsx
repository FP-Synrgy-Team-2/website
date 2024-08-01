import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SavedAccount } from '@/types';
import { Breadcrumbs, Form, Label, Input, Button } from '@/components';
import colorBlueSVG from '../../assets/icons/color=blue.svg';
import { axios } from '@/axios';
import Skeleton from 'react-loading-skeleton';
import arrowClockwiseSVG from '../../assets/arrow-clockwise.svg';
import { useAuthContext } from '@/hooks';

interface FormData {
  nominal: string;
  catatan: string;
  simpanRekening: boolean;
}

function Saved() {
  const navigate = useNavigate();
  const { bankAccount } = useAuthContext();
  const [recipientAccountStatus, setRecipientAccountStatus] = useState<
    'initial' | 'not found' | 'found' | 'error' | 'invalid' | 'fetching'
  >('initial');

  const breadcrumbs = [
    { label: 'Transfer', path: '/transfer' },
    { label: 'Input Data Transfer', path: '/transfer/new' },
  ];

  const locationReact = useLocation();
  const account = locationReact.state?.account as SavedAccount;

  const methods = useForm<FormData>({
    defaultValues: {
      nominal: '',
      catatan: '',
      simpanRekening: false,
    },
  });

  const {
    register,
    formState: { errors },
  } = methods;

  const fetchRecipientAccountStatus = useCallback(async () => {
    const navigateToTransfer = () => navigate('/transfer');

    if (!account) {
      setRecipientAccountStatus('invalid');
      return setTimeout(navigateToTransfer, 5000);
    }

    const recipientAccountNumber = account.accountNumber;

    try {
      setRecipientAccountStatus('fetching');
      const res = await axios.get(
        `/bank-accounts/account/${recipientAccountNumber}`
      );
      if (res.data.code === 403) {
        setRecipientAccountStatus('not found');
        return setTimeout(navigateToTransfer, 5000);
      }
      setRecipientAccountStatus('found');
    } catch (err) {
      setRecipientAccountStatus('error');
      console.error(err);
    }
  }, [navigate, setRecipientAccountStatus, account]);

  useEffect(() => {
    fetchRecipientAccountStatus();

    return () => {
      setRecipientAccountStatus('initial');
    };
  }, [fetchRecipientAccountStatus]);

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    if (recipientAccountStatus !== 'found')
      return alert('Rekening tujuan tidak valid');

    if (account) {
      const data = {
        fromAccount: bankAccount?.accountNumber,
        toAccount: account.accountNumber,
        toName: account.ownerName,
        amount: formData.nominal,
        note: formData.catatan || undefined,
        saved: false,
      };

      navigate('/transfer/confirm', { state: { ...data } });
    }
  };

  return (
    <div className="px-[2.6875rem] py-[4.625rem]" id="transfer-saved">
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <Form
        onSubmit={onSubmit}
        methods={methods}
        className="flex w-[30.75rem] flex-col"
      >
        {recipientAccountStatus === 'fetching' ? (
          <div className="mt-10 flex flex-col gap-[1.125rem]">
            <Skeleton className="h-8" />
            <Skeleton className="h-8" />
          </div>
        ) : recipientAccountStatus === 'found' ? (
          <div className="mt-16 flex flex-col gap-[1.125rem]">
            <Label className="text-2xl">Rekening Tujuan</Label>
            <p className="text-2xl font-semibold">
              {account.ownerName}
              <span className="font-normal text-dark-grey">
                {' '}
                &bull; {account.accountNumber}
              </span>
            </p>
          </div>
        ) : (
          <p className="mt-10 flex items-center text-danger" role="alert">
            {recipientAccountStatus === 'error' ? (
              <>
                Error memuat data rekening tujuan, muat ulang?
                <span className="ml-1 inline-flex items-center rounded-full p-0.5 hover:shadow-md">
                  <button
                    type="button"
                    aria-label="Tombol muat ulang data rekening tujuan"
                    onClick={() => {
                      fetchRecipientAccountStatus();
                    }}
                  >
                    <img src={arrowClockwiseSVG} alt="Muat ulang" />
                  </button>
                </span>
              </>
            ) : (
              <span className="relative inline-flex items-center">
                {recipientAccountStatus === 'invalid'
                  ? 'Rekening tujuan tidak valid, mengalihkan '
                  : 'Rekening tujuan tidak ditemukan, mengalihkan'}
                <span className="spinner absolute right-[-2rem] h-4 w-4 border-4 border-primary-dark-blue" />
                <p className="sr-only">Memuat data rekening</p>
              </span>
            )}
          </p>
        )}

        <div className="mt-4">
          <Label className="text-2xl">Rekening Sumber</Label>
          <div className="relative mt-2.5 flex h-[5.3281rem] w-full flex-col justify-center gap-[0.3125rem] rounded-3xl bg-[#E4EDFF] px-6 py-2.5">
            <h3 className="flex gap-[0.3125rem] text-2xl text-primary-dark-blue">
              {bankAccount?.ownerName}
              <img src={colorBlueSVG} alt="Bank Icon" />
            </h3>
            <h4 className="text-lg text-dark-grey">
              {bankAccount?.accountNumber}
            </h4>
          </div>
        </div>

        <div className="mt-5">
          <Label className="text-2xl">Nominal Transfer</Label>
          <Input
            {...register('nominal', {
              required: 'Tulis nominal yang ingin ditransfer',
            })}
            placeholder="xxxxxxx"
            aria-label="Text input field rekening tujuan"
            type="number"
            className="no-increment-buttons mt-[0.3125rem] flex h-[3.75rem] w-full rounded-3xl border px-[1.875rem] py-2.5 text-lg"
            min={0}
            max={100000000}
          />
          {errors.nominal && (
            <p className="text-sm leading-8 text-danger" role="alert">
              {errors.nominal.message}
            </p>
          )}
        </div>

        <div className="mt-5">
          <Label className="text-2xl">Catatan (Optional)</Label>
          <Input
            {...register('catatan')}
            placeholder="Tambahkan catatan"
            aria-label="Text input field catatan (opsional)"
            type="text"
            className="mt-[0.3125rem] flex h-[3.75rem] w-full rounded-3xl border px-[1.875rem] py-2.5 text-lg"
          />
        </div>

        {/* <div className="h-[3.25rem] mt-[0.6875rem] flex gap-2.5 items-center">
          <input {...register('simpanRekening')} type="checkbox" id="check" className='scale-150' />
          <Label htmlFor="check" className='text-2xl'>Simpan Rekening</Label>
        </div> */}

        <Button
          type="submit"
          color="primary-dark-blue"
          className="mt-[3.9375rem] h-[3.25rem] w-[10.4375rem] self-center rounded-3xl px-2.5 py-[0.3125rem] text-2xl font-bold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Tombol lanjutkan"
        >
          Lanjutkan
        </Button>
      </Form>
    </div>
  );
}

export default Saved;
