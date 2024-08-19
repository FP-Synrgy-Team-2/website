import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, Validate } from 'react-hook-form';
import { Breadcrumbs, Input, Label, Form } from '@/components';
import useAuth from '@/hooks/useAuth';
import { useCallback, useState } from 'react';
import { BankAccount } from '@/types';
import { snakeToCamelCase } from '@/utils/formatter';
import AccountCard from '@/components/Transfer/TransferPage/AccountCard';
import NextButton from '@/components/Transfer/TransferPage/NextButton';
import TextFieldErrorMsg from '@/components/Transfer/TransferPage/TextFieldErrorMsg';

interface FormData {
  noRek: string;
  nominal: string;
  catatan: string;
  simpanRekening: boolean;
}

function TransferForm() {
  const navigate = useNavigate();
  const { api: axios, token } = useAuth();
  const [bankAccount, setBankAccount] = useState<BankAccount | null>(null);
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

  const validateRecipient = useCallback<Validate<string, FormData>>(
    async (accountNumber: string) => {
      try {
        if (accountNumber === bankAccount?.accountNumber)
          return 'Tidak bisa transfer ke nomor rekening sendiri';

        const res = await axios.get(
          `/api/bank-accounts/account/${accountNumber}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.code === 404) return 'Rekening tidak ditemukan';
        setRecipientAccount(snakeToCamelCase<BankAccount>(res.data.data));
      } catch (err) {
        setRecipientAccount(null);
        return 'Error memuat data rekening';
      }
    },
    [bankAccount, axios, setRecipientAccount, token]
  );

  const validateAmount = useCallback<Validate<string, FormData>>(
    (amount: string) => {
      if (bankAccount && bankAccount.balance < parseInt(amount))
        return 'Saldo tidak cukup';
    },
    [bankAccount]
  );

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
    <div id="transfer-new">
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <div className="flex w-[30.75rem] flex-col sm:w-full sm:px-4">
        <section>
          <h2 tabIndex={0}>{'Rekening Sumber'}</h2>
          <AccountCard pushAccountFn={setBankAccount} />
        </section>
        <Form<FormData>
          className="flex w-[30.75rem] flex-col sm:w-full"
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
              {'Nomor Rekening Tujuan'}
            </Label>
            <span className="relative flex items-center">
              <Input
                {...register('noRek', {
                  validate: validateRecipient,
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
                    {'Memuat data rekening'}
                  </p>
                </>
              )}
            </span>
            {errors.noRek && <TextFieldErrorMsg fieldError={errors.noRek} />}
          </fieldset>
          <fieldset
            className="mt-[0.6875rem]"
            form="new-input-form"
            aria-labelledby="new-input-amount"
          >
            <Label className="" id="new-input-amount">
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
              aria-label="Text input field nominal transfer"
              placeholder="xxxxxxx"
              type="number"
              className="no-increment-buttons mt-[0.3125rem] flex h-[2.75rem] w-full rounded-xl border px-[1.875rem] py-2.5 text-lg"
            />
            {errors.nominal && (
              <TextFieldErrorMsg fieldError={errors.nominal} />
            )}
          </fieldset>
          <fieldset
            className="mt-[0.6875rem]"
            form="new-input-form"
            aria-labelledby="new-input-note"
          >
            <Label className="" id="new-input-note">
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
              className="mt-[0.3125rem] flex h-[2.75rem] w-full rounded-xl border px-[1.875rem] py-2.5 text-lg"
            />
            {errors.catatan && (
              <TextFieldErrorMsg fieldError={errors.catatan} />
            )}
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
            <Label htmlFor="check" aria-label="Tombol simpan rekening">
              {'Simpan Rekening'}
            </Label>
          </fieldset>
          <NextButton />
        </Form>
      </div>
    </div>
  );
}

export default TransferForm;
