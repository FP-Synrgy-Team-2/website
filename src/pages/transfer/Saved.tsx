import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { BankAccount, SavedAccount } from '@/types';
import { Breadcrumbs, Form, Label, Input, Button } from '@/components';
import Skeleton from 'react-loading-skeleton';
import useAuth from '@/hooks/useAuth';
import { snakeToCamelCase } from '@/utils/formatter';

interface FormData {
  nominal: string;
  catatan: string;
  simpanRekening: boolean;
}

function Saved() {
  const navigate = useNavigate();
  const { api: axios, token, userId } = useAuth();
  const [bankAccount, setBankAccount] = useState<BankAccount | null>(null);
  const [bankAccountFetchStatus, setBankAccountFetchStatus] = useState<
    'no fetching' | 'error' | 'fetching'
  >('no fetching');
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

  const fetchBankAccount = useCallback(async () => {
    try {
      setBankAccountFetchStatus('fetching');
      const res = await axios.get(`/api/bank-accounts/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.code === 404) throw new Error('not found');
      setBankAccount(snakeToCamelCase<BankAccount>(res.data.data));
      setBankAccountFetchStatus('no fetching');
    } catch (err) {
      console.error(err);
      setBankAccountFetchStatus('error');
    }
  }, [setBankAccountFetchStatus]);

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
        `/api/bank-accounts/account/${recipientAccountNumber}`
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
    fetchBankAccount();
    fetchRecipientAccountStatus();

    return () => {
      setRecipientAccountStatus('initial');
    };
  }, [fetchRecipientAccountStatus]);

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    if (recipientAccountStatus !== 'found')
      return alert('Rekening tujuan tidak valid');

    if (bankAccount && recipientAccountStatus === 'found') {
      const data = {
        balance: bankAccount.balance,
        fromAccount: bankAccount.accountNumber,
        fromName: bankAccount.ownerName,
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
    <div className="">
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <div className="mt-3 flex w-1/2 flex-col">
        <section
          className="flex flex-col gap-[1.125rem]"
          aria-labelledby="saved-account-to"
        >
          <h2 className="text-xl-body" id="saved-account-to" tabIndex={0}>
            Rekening Tujuan
          </h2>
          <p
            className={`${recipientAccountStatus === 'error' || recipientAccountStatus === 'invalid' ? 'text-base text-danger' : 'text-xl-body font-semibold'}`}
          >
            {recipientAccountStatus === 'fetching' ? (
              <Skeleton className="h-8" />
            ) : recipientAccountStatus === 'found' ? (
              <>
                <span tabIndex={0}>{account.ownerName}</span>
                <span
                  tabIndex={0}
                  className="font-normal text-dark-grey"
                  aria-label={account.accountNumber.split('').join(' ')}
                >
                  {' '}
                  <span aria-hidden={true}> &bull;</span>
                  {account.accountNumber}
                </span>
              </>
            ) : recipientAccountStatus === 'error' ? (
              <span className="inline-flex items-center" role="alert">
                Error memuat data rekening tujuan, muat ulang?
                <span className="ml-1 inline-flex items-center rounded-lg p-0.5 hover:shadow-md">
                  <button
                    type="button"
                    aria-label="Tombol muat ulang data rekening tujuan"
                    onClick={() => {
                      fetchRecipientAccountStatus();
                    }}
                  >
                    <img
                      src="/images/iconsarrow-clockwise.svg"
                      alt="Muat ulang"
                    />
                  </button>
                </span>
              </span>
            ) : (
              <span className="relative inline-flex items-center" role="alert">
                {recipientAccountStatus === 'invalid'
                  ? 'Rekening tujuan tidak valid, mengalihkan '
                  : 'Rekening tujuan tidak ditemukan, mengalihkan'}
                <span className="spinner absolute right-[-2rem] h-4 w-4 border-4 border-primary-dark-blue" />
                <p className="sr-only">Memuat data rekening</p>
              </span>
            )}
          </p>
        </section>

        <section
          className="mt-[1.0625rem]"
          aria-labelledby="saved-account-from"
        >
          <h2 className="text-xl-body" id="saved-account-from" tabIndex={0}>
            Rekening Sumber
          </h2>
          <p className="relative mt-2.5 flex h-[5.3281rem] w-full flex-col justify-center gap-[0.3125rem] rounded-lg bg-[#E4EDFF] px-6 py-2.5">
            <span className="flex gap-[0.3125rem] text-xl-body text-primary-dark-blue">
              {bankAccountFetchStatus === 'fetching' ? (
                <Skeleton containerClassName="w-full" baseColor="#5D5D5D" />
              ) : bankAccountFetchStatus === 'error' ? (
                <>
                  Gagal memuat data, ulangi?
                  <span className="ml-1 inline-flex items-center rounded-lg p-0.5 hover:shadow-md">
                    <button
                      type="button"
                      aria-label="Tombol muat ulang data rekening tujuan"
                      onClick={() => {
                        fetchBankAccount();
                      }}
                    >
                      <img
                        src="/images/icons/arrow-clockwise.svg"
                        alt="Muat ulang"
                      />
                    </button>
                  </span>
                </>
              ) : (
                <>
                  <span tabIndex={0}>{bankAccount?.ownerName}</span>
                  <img src="/images/icons/color=blue.svg" alt="" />
                </>
              )}
            </span>
            <span
              tabIndex={0}
              className="text-lg text-dark-grey"
              aria-label={
                bankAccountFetchStatus === 'fetching'
                  ? 'memuat data rekening sumber'
                  : bankAccountFetchStatus === 'error'
                    ? 'error'
                    : bankAccount?.accountNumber.split('').join(' ')
              }
            >
              {bankAccountFetchStatus === 'fetching' ? (
                <Skeleton baseColor="#5D5D5D" />
              ) : bankAccountFetchStatus === 'error' ? (
                <>&bull;&bull;&bull;&bull;&bull;&bull;&bull;</>
              ) : (
                bankAccount?.accountNumber
              )}
            </span>
          </p>
        </section>

        <Form
          onSubmit={onSubmit}
          methods={methods}
          className="flex w-full flex-col"
          id="saved-input-form"
        >
          <fieldset
            className="mt-5"
            aria-labelledby="saved-input-amount"
            form="saved-input-form"
          >
            <Label className="text-xl-body" id="saved-input-amount">
              Nominal Transfer
            </Label>
            <Input
              {...register('nominal', {
                required: 'Tulis nominal yang ingin ditransfer',
              })}
              placeholder="xxxxxxx"
              aria-label="Text input field rekening tujuan"
              type="number"
              className="no-increment-buttons mt-[0.3125rem] flex h-[3.75rem] w-full rounded-lg border px-[1.875rem] py-2.5 text-lg"
              min={0}
              max={100000000}
            />
            {errors.nominal && (
              <p className="text-sm leading-8 text-danger" role="alert">
                {errors.nominal.message}
              </p>
            )}
          </fieldset>

          <fieldset
            className="mt-5"
            aria-labelledby="saved-input-note"
            form="saved-input-form"
          >
            <Label className="text-xl-body" id="saved-input-note">
              Catatan (Optional)
            </Label>
            <Input
              {...register('catatan')}
              placeholder="Tambahkan catatan"
              aria-label="Text input field catatan (opsional)"
              type="text"
              className="mt-[0.3125rem] flex h-[3.75rem] w-full rounded-lg border px-[1.875rem] py-2.5 text-lg"
            />
          </fieldset>

          {/* <div className="h-[3.25rem] mt-[0.6875rem] flex gap-2.5 items-center">
            <input {...register('simpanRekening')} type="checkbox" id="check" className='scale-150' />
            <Label htmlFor="check" className='text-xl-body'>Simpan Rekening</Label>
          </div> */}

          <Button
            type="submit"
            className="mt-[3.9375rem] h-[3.25rem] w-[10.4375rem] self-center rounded-lg bg-primary-dark-blue px-2.5 py-[0.3125rem] text-xl-body font-bold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Tombol lanjutkan"
          >
            Lanjutkan
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Saved;
