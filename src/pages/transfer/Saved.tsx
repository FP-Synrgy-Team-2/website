import { memo, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, Validate } from 'react-hook-form';
import { BankAccount, SavedAccount } from '@/types';
import { Breadcrumbs, Form, Label, Input } from '@/components';
import Skeleton from 'react-loading-skeleton';
import useAuth from '@/hooks/useAuth';
import AccountCard from '@/components/Transfer/TransferPage/AccountCard';
import NextButton from '@/components/Transfer/TransferPage/NextButton';
import TextFieldErrorMsg from '@/components/Transfer/TransferPage/TextFieldErrorMsg';

interface FormData {
  nominal: string;
  catatan: string;
  simpanRekening: boolean;
}

function Saved() {
  const navigate = useNavigate();
  const { api: axios } = useAuth();
  const [bankAccount, setBankAccount] = useState<BankAccount | null>(null);

  const [recipientAccountStatus, setRecipientAccountStatus] = useState<
    'initial' | 'found' | 'error' | 'invalid' | 'fetching'
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
    mode: 'onBlur',
  });

  const {
    register,
    formState: { errors },
  } = methods;

  const validateAmount = useCallback<Validate<string, FormData>>(
    (amount) => {
      if (bankAccount && bankAccount.balance < parseInt(amount))
        return 'Saldo tidak cukup';
    },
    [bankAccount]
  );

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
      if (res.data.code === 404) {
        setRecipientAccountStatus('invalid');
        return setTimeout(navigateToTransfer, 5000);
      }
      setRecipientAccountStatus('found');
    } catch (err) {
      setRecipientAccountStatus('error');
      console.error(err);
    }
  }, [navigate, setRecipientAccountStatus, account, axios]);

  useEffect(() => {
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
    <div className="md:mx-[5%]">
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <div className="mt-3 flex w-1/2 flex-col md:w-full">
        <section
          className="flex flex-col gap-[1.125rem]"
          aria-labelledby="saved-account-to"
        >
          <h2 className="text-xl-body" id="saved-account-to" tabIndex={0}>
            {'Rekening Tujuan'}
          </h2>
          <p
            className={`${recipientAccountStatus === 'error' || recipientAccountStatus === 'invalid' ? 'text-base text-danger' : 'text-xl-body font-semibold'}`}
            aria-live="polite"
            aria-busy={recipientAccountStatus === 'fetching'}
            role={
              recipientAccountStatus === 'error' ||
              recipientAccountStatus === 'invalid'
                ? 'alert'
                : undefined
            }
          >
            {recipientAccountStatus === 'fetching' && (
              <Skeleton className="h-8" />
            )}
            {recipientAccountStatus === 'found' && (
              <>
                <span tabIndex={0}>{account.ownerName}</span>
                <span
                  tabIndex={0}
                  className="font-normal text-dark-grey"
                  aria-label={account.accountNumber.split('').join(' ')}
                >
                  <span aria-hidden={true}>{' • '}</span>
                  {account.accountNumber}
                </span>
              </>
            )}
            {(recipientAccountStatus === 'error' ||
              recipientAccountStatus === 'invalid') && (
              <span className="inline-flex items-center">
                {recipientAccountStatus === 'error'
                  ? 'Error memuat data rekening tujuan, muat ulang?'
                  : 'Rekening tujuan tidak valid, mengalihkan'}
                {recipientAccountStatus === 'error' ? (
                  <span className="ml-1 inline-flex items-center rounded-lg p-0.5 hover:shadow-md">
                    <button
                      type="button"
                      aria-label="Tombol muat ulang data rekening tujuan"
                      onClick={() => {
                        fetchRecipientAccountStatus();
                      }}
                    >
                      <img
                        src="/images/icons/arrow-clockwise.svg"
                        alt="icon muat ulang"
                        aria-hidden
                      />
                    </button>
                  </span>
                ) : (
                  <span
                    className="spinner ml-1 h-4 w-4 border-4 border-primary-dark-blue"
                    aria-hidden
                  />
                )}
              </span>
            )}
          </p>
        </section>

        <section
          className="mt-[1.0625rem]"
          aria-labelledby="saved-account-from"
        >
          <h2 className="text-xl-body" id="saved-account-from" tabIndex={0}>
            {'Rekening Sumber'}
          </h2>
          <AccountCard pushAccountFn={setBankAccount} />
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
              {'Nominal Transfer'}
            </Label>
            <Input
              {...register('nominal', {
                validate: validateAmount,
                required: 'Tulis nominal yang ingin ditransfer',
                min: {
                  value: 1000,
                  message: 'Minimal nominal yang dikirim adalah 1000 rupiah',
                },
              })}
              placeholder="xxxxxxx"
              aria-label="Text input field rekening tujuan"
              type="number"
              className="no-increment-buttons mt-[0.3125rem] flex h-[3.75rem] w-full rounded-lg border px-[1.875rem] py-2.5 text-lg"
            />
            {errors.nominal && (
              <TextFieldErrorMsg fieldError={errors.nominal} />
            )}
          </fieldset>
          <fieldset
            className="mt-5"
            aria-labelledby="saved-input-note"
            form="saved-input-form"
          >
            <Label className="text-xl-body" id="saved-input-note">
              {'Catatan (Optional)'}
            </Label>
            <Input
              {...register('catatan', {
                maxLength: {
                  value: 25,
                  message: 'Catatan tidak bisa lebih dari 25 karakter',
                },
              })}
              placeholder="Tambahkan catatan"
              aria-label="Text input field catatan (opsional)"
              type="text"
              className="mt-[0.3125rem] flex h-[3.75rem] w-full rounded-lg border px-[1.875rem] py-2.5 text-lg"
            />
            {errors.catatan && (
              <TextFieldErrorMsg fieldError={errors.catatan} />
            )}
          </fieldset>
          <NextButton />
        </Form>
      </div>
    </div>
  );
}

export default memo(Saved);
