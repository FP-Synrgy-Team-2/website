import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Breadcrumbs, Input, Label, Form } from '@/components';

interface FormData {
  noRek: string;
  nominal: string;
  catatan: string;
  simpanRekening: boolean;
}

function TransferForm() {
  const navigate = useNavigate();
  const methods = useForm<FormData>({
    defaultValues: {
      noRek: '',
      nominal: '',
      catatan: '',
      simpanRekening: false,
    },
  });

  const { register } = methods;

  const breadcrumbs = [
    { label: 'Transfer', path: '/transfer' },
    { label: 'Input Data Transfer', path: '/transfer/new' },
  ];

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    console.log('Data Transfer:', formData);
    navigate('/transfer/confirm', { state: formData });
  };

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Form<FormData> onSubmit={onSubmit} methods={methods}>
        <div className="mt-10">
          <Label className="text-xl">Rekening Sumber</Label>
          <div className="relative bg-[#E4EDFF] px-3 py-4">
            <h3>BCA TABUNGANKU</h3>
            <img
              src="/images/icons/color=blue.svg"
              className="absolute left-36 top-3"
              alt="Bank Icon"
            />
            <h4>8923445590</h4>
          </div>
        </div>
        <div className="mt-3">
          <Label className="text-xl">Nomor Rekening Tujuan</Label>
          <Input
            {...register('noRek', { required: true })}
            placeholder="******"
            type="text"
          />
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

export default TransferForm;
