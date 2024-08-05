import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, Validate } from 'react-hook-form';
import { Breadcrumbs, Input, Label, Form, ButtonPrimary } from '@/components';
import useAuth from '@/hooks/useAuth';
import { useCallback, useEffect, useState } from 'react';
import { BankAccount } from '@/types';
import { snakeToCamelCase } from '@/utils/formatter';
import Skeleton from 'react-loading-skeleton';

interface FormData {
  noRek: string;
  nominal: string;
  catatan: string;
  simpanRekening: boolean;
}

function TransferForm() {
  const navigate = useNavigate();
  const { api: axios, token, userId } = useAuth();
  const [bankAccount, setBankAccount] = useState<BankAccount | null>(null);
  const [bankAccountFetchStatus, setBankAccountFetchStatus] = useState<
    'no fetching' | 'fetching' | 'error'
  >('no fetching');
  const [recipientAccount, setRecipientAccount] = useState<BankAccount | null>(
    null
  );

  const methods = useForm<FormData>({
    defaultValues: {
      noRek: '',
      nominal: '',
      catatan: '',
      simpanRekening: false,
    },
    mode: 'onBlur',
  });
  const {
    register,
    formState: { isValidating, errors },
  } = methods;

  const breadcrumbs = [
    { label: 'Transfer', path: '/transfer' },
    { label: 'Input Data Transfer', path: '/transfer/new' },
  ];

  const validateAccountNumber: Validate<string, FormData> = async (value) => {
    try {
      if (value === bankAccount?.accountNumber) {
        return 'Tidak bisa transfer ke nomor rekening sendiri';
      }

      const res = await axios.get(`/api/bank-accounts/account/${value}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.code === 404) return 'Rekening tidak ditemukan';
      setRecipientAccount(snakeToCamelCase<BankAccount>(res.data.data));
    } catch (err) {
      setRecipientAccount(null);
      console.error(err);
      return 'Error memuat data rekening';
    }
  };

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
      setBankAccount(null);
      setBankAccountFetchStatus('error');
    }
  }, [setBankAccountFetchStatus]);

  useEffect(() => {
    fetchBankAccount();
  }, [fetchBankAccount]);

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    if (bankAccount && recipientAccount) {
      const data = {
        balance: bankAccount.balance,
        fromAccount: bankAccount.accountNumber,
        fromName: bankAccount.ownerName,
        toAccount: formData.noRek,
        toName: recipientAccount.ownerName,
        amount: formData.nominal,
        note: formData.catatan || undefined,
        saved: formData.simpanRekening,
      };

      navigate('/transfer/confirm', { state: { ...data } });
    }
  };

  return (
    <div className="" id="transfer-new">
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <div className="flex w-[30.75rem] flex-col">
        <section className="">
          <h2 tabIndex={0}>Rekening Sumber</h2>
          <p className="relative mt-2.5 flex h-[5.3281rem] w-full flex-col justify-center gap-[0.3125rem] rounded-xl bg-[#E4EDFF] px-6 py-2.5">
            <span
              tabIndex={0}
              className={`flex gap-[0.3125rem] ${bankAccountFetchStatus === 'error' ? 'text-lg text-danger' : 'text-xl-body text-primary-dark-blue'}`}
            >
              {bankAccountFetchStatus === 'fetching' ? (
                <Skeleton containerClassName="w-full" baseColor="#5D5D5D" />
              ) : bankAccountFetchStatus === 'error' ? (
                <>
                  Gagal memuat data, ulangi?
                  <span className="ml-1 inline-flex items-center rounded-full p-0.5 hover:shadow-md">
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
                  {bankAccount?.ownerName}
                  <img src="/images/icons/color=blue.svg" alt="Bank Icon" />
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
                    : 'Nomor rekening sumber:' +
                      bankAccount?.accountNumber.split('').join(' ')
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
        <Form<FormData>
          className="flex w-[30.75rem] flex-col"
          onSubmit={onSubmit}
          methods={methods}
          id="new-input-form"
        >
          <fieldset
            className="mt-[1.9219rem]"
            form="new-input-form"
            aria-labelledby="new-input-to"
          >
            <Label className="" id="new-input-to">
              Nomor Rekening Tujuan
            </Label>
            <span className="relative flex items-center">
              <Input
                {...register('noRek', {
                  validate: validateAccountNumber,
                  required: 'Nomor rekening penerima diperlukan',
                })}
                min={0}
                aria-label="Text input field nomor rekening tujuan"
                minLength={12}
                maxLength={12}
                placeholder="xxxxxxx"
                type="number"
                className="no-increment-buttons mt-[0.3125rem] flex h-[2.75rem] w-full rounded-xl border px-[1.875rem] py-2.5 text-lg"
              />
              {isValidating && (
                <>
                  <span className="spinner absolute right-[-2rem] h-4 w-4 border-4 border-primary-dark-blue" />
                  <p className="sr-only" tabIndex={0}>
                    Memuat data rekening
                  </p>
                </>
              )}
            </span>
            {errors.noRek && (
              <p className="text-sm leading-8 text-danger" role="alert">
                {errors.noRek.message}
              </p>
            )}
          </fieldset>
          <fieldset
            className="mt-[0.6875rem]"
            form="new-input-form"
            aria-labelledby="new-input-amount"
          >
            <Label className="" id="new-input-amount">
              Nominal Transfer
            </Label>
            <Input
              {...register('nominal', {
                required: 'Tulis nominal yang ingin ditransfer',
              })}
              aria-label="Text input field nominal transfer"
              placeholder="xxxxxxx"
              type="number"
              className="no-increment-buttons mt-[0.3125rem] flex h-[2.75rem] w-full rounded-xl border px-[1.875rem] py-2.5 text-lg"
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
            className="mt-[0.6875rem]"
            form="new-input-form"
            aria-labelledby="new-input-note"
          >
            <Label className="" id="new-input-note">
              Catatan (Optional)
            </Label>
            <Input
              {...register('catatan')}
              placeholder="Tambahkan catatan"
              aria-label="Text input field catatan (opsional)"
              type="text"
              className="mt-[0.3125rem] flex h-[2.75rem] w-full rounded-xl border px-[1.875rem] py-2.5 text-lg"
            />
          </fieldset>
          <fieldset
            className="mt-[0.6875rem] flex h-[3.25rem] items-center gap-2.5"
            form="new-input-form"
            aria-labelledby="new-input-save"
          >
            <input
              {...register('simpanRekening')}
              type="checkbox"
              id="check"
              className="scale-150"
            />
            <Label
              htmlFor="check"
              className=""
              aria-label="Tombol simpan rekening"
            >
              Simpan Rekening
            </Label>
          </fieldset>
          <ButtonPrimary
            type="submit"
            className="self-center rounded-xl px-2.5 px-5 py-2 py-[0.3125rem] font-bold"
            aria-label="Tombol lanjutkan"
          >
            Lanjutkan
          </ButtonPrimary>
        </Form>
      </div>
    </div>
  );
}

export default TransferForm;
