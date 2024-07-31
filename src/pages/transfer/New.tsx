import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, Validate } from 'react-hook-form';
import { Button, Breadcrumbs, Input, Label, Form } from '@/components';
import colorBlueSVG from '../../assets/icons/color=blue.svg';
import { axios } from '@/axios';
import { useAuthContext } from '@/hooks';

interface FormData {
  noRek: string;
  nominal: string;
  catatan: string;
  simpanRekening: boolean;
}

function TransferForm() {
  const navigate = useNavigate();
  const { bankAccount } = useAuthContext();

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
      const res = await axios.get(`/bank-accounts/account/${value}`);
      if (res.data.code === 403) return 'Nomor rekening tidak dapat ditemukan';
    } catch (err) {
      console.error(err);
      return 'Error memuat data rekening';
    }
  };

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    const data = {
      fromAccount: bankAccount?.accountNumber,
      toAccount: formData.noRek,
      toName: 'test',
      amount: formData.nominal,
      note: formData.catatan || undefined,
      saved: formData.simpanRekening,
    };

    console.log('Data Transfer:', formData);
    navigate('/transfer/confirm', { state: { ...data } });
  };

  return (
    <div className="px-[2.6875rem] py-[4.625rem]" id="transfer-new">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Form<FormData>
        className="flex w-[30.75rem] flex-col"
        onSubmit={onSubmit}
        methods={methods}
      >
        <div className="mt-[4.0625rem]">
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
        <div className="mt-[1.9219rem]">
          <Label className="text-2xl">Nomor Rekening Tujuan</Label>
          <span className="relative flex items-center">
            <Input
              {...register('noRek', {
                validate: validateAccountNumber,
                required: 'Nomor rekening penerima diperlukan',
              })}
              min={0}
              minLength={12}
              maxLength={12}
              placeholder="xxxxxxx"
              type="number"
              className="no-increment-buttons mt-[0.3125rem] flex h-[3.75rem] w-full rounded-3xl border px-[1.875rem] py-2.5 text-lg"
            />
            {isValidating && (
              <>
                <span className="spinner absolute right-[-2rem] h-4 w-4 border-4 border-primary-dark-blue" />
                <p className="sr-only">Memuat data rekening</p>
              </>
            )}
          </span>
          {errors.noRek && (
            <p className="text-sm leading-8 text-danger" role="alert">
              {errors.noRek.message}
            </p>
          )}
        </div>
        <div className="mt-[0.6875rem]">
          <Label className="text-2xl">Nominal Transfer</Label>
          <Input
            {...register('nominal', {
              required: 'Tulis nominal yang ingin ditransfer',
            })}
            placeholder="xxxxxxx"
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
        <div className="mt-[0.6875rem]">
          <Label className="text-2xl">Catatan (Optional)</Label>
          <Input
            {...register('catatan')}
            placeholder="Tambahkan catatan"
            type="text"
            className="mt-[0.3125rem] flex h-[3.75rem] w-full rounded-3xl border px-[1.875rem] py-2.5 text-lg"
          />
        </div>
        <div className="mt-[0.6875rem] flex h-[3.25rem] items-center gap-2.5">
          <input
            {...register('simpanRekening')}
            type="checkbox"
            id="check"
            className="scale-150"
          />
          <Label htmlFor="check" className="text-2xl">
            Simpan Rekening
          </Label>
        </div>
        <Button
          type="submit"
          color="primary-dark-blue"
          className="mt-[3.9375rem] h-[3.25rem] w-[10.4375rem] self-center rounded-3xl px-2.5 py-[0.3125rem] text-2xl font-bold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Lanjutkan
        </Button>
      </Form>
    </div>
  );
}

export default TransferForm;
