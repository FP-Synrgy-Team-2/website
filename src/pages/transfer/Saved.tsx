import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SavedAccount } from '@/types/saved-accounts';
import { Breadcrumbs, Form, Label, Input, Button } from '@/components';

interface FormData {
  nominal: string;
  catatan: string;
  simpanRekening: boolean;
}

function Saved() {
  const navigate = useNavigate();

  const breadcrumbs = [
    { label: 'Transfer', path: '/transfer' },
    { label: 'Input Data Transfer', path: '/transfer/new' },
  ];

  const location = useLocation();
  useEffect(() => {
    console.log(location.state);
  }, [location]);

  const account = location.state?.account as SavedAccount;

  const methods = useForm<FormData>({
    defaultValues: {
      nominal: '',
      catatan: '',
      simpanRekening: false,
    },
  });

  const { register } = methods;

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    if (account) {
      const dataTransfer = {
        ownerName: account.owner_name,
        accountNumber: account.account_number,
        ...formData,
      };

      console.log('Data Transfer:', dataTransfer);
      navigate('/transfer/confirm', { state: dataTransfer });
    } else {
      alert('Tidak ada data rekening tujuan.');
    }
  };

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <Form onSubmit={onSubmit} methods={methods}>
        {account ? (
          <div className="mt-10">
            <Label className="text-xl">Rekening Tujuan</Label>
            <p className="mt-3 text-xl font-semibold">
              {account.owner_name} &bull;{' '}
              <span className="font-normal">{account.account_number}</span>
            </p>
          </div>
        ) : (
          <div className="mt-10 text-red-500">
            Tidak ada data rekening tujuan.
          </div>
        )}

        <div className="mt-3">
          <Label className="text-xl">Rekening Sumber</Label>
          <div className="relative bg-[#E4EDFF] px-3 py-4">
            <h3>BCA TABUNGANKU</h3>
            <img
              src="/images/icons/color=blue.svg"
              className="absolute left-36 top-4"
              alt="Bank Icon"
            />
            <h4>8923445590</h4>
          </div>
        </div>

        <div className="mt-3">
          <Label className="text-xl">Nominal Transfer</Label>
          <Input
            {...register('nominal', { required: true })}
            placeholder="******"
            type="text"
          />
        </div>

        <div className="mt-3">
          <Label className="text-xl">Catatan (Optional)</Label>
          <Input
            {...register('catatan')}
            placeholder="Tambahkan catatan"
            type="text"
          />
        </div>

        <div className="mt-3 flex gap-1">
          <input {...register('simpanRekening')} type="checkbox" id="check" />
          <Label htmlFor="check">Simpan Rekening</Label>
        </div>

        <div className="mt-3">
          <Button
            type="submit"
            color="blue"
            className="rounded-3xl bg-blue-500 px-6 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Lanjutkan
          </Button>
        </div>
      </Form>
    </>
  );
}

export default Saved;
