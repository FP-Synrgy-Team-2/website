import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Breadcrumbs, Input, Label, Form } from '@/components';
import { useEffect, useState } from 'react';
import PinInput from './Pin';
import axios from 'axios';
import moment from 'moment';
import { getUserData } from '@/utils/getUserData';

const { VITE_API_URL } = import.meta.env;

interface FormData {
  noRek: string;
  nominal: string;
  catatan: string;
  simpanRekening: boolean;
}

const getAccountId = async (account_number: string) => {
  try {
    const response = await axios.get(
      `${VITE_API_URL}/bank-accounts/account/${account_number}`,
      {
        headers: {
          Authorization: `Bearer ${getUserData().access_token}`,
        },
      }
    );
    return response.data.data.account_id;
  } catch (error) {
    console.error('Error fetching account ID:', error);
    throw error;
  }
};

function TransferForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ account_number: string }>({
    account_number: '',
  });
  const [showPinInput, setShowPinInput] = useState<boolean>(false);
  const methods = useForm<FormData>({
    defaultValues: {
      noRek: '',
      nominal: '',
      catatan: '',
      simpanRekening: false,
    },
  });

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('token') || '{}'));
  }, []);

  const { register } = methods;

  const breadcrumbs = [
    { label: 'Transfer', path: '/transfer' },
    { label: 'Input Data Transfer', path: '/transfer/new' },
  ];

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    console.log('Data Transfer:', formData);
    setShowPinInput(true);
    // navigate('/transfer/confirm', { state: formData });
  };

  const handlePinValidated = async () => {
    const formData = methods.getValues();
    const sourceAccountNumber = user?.account_number;
    const beneficiaryAccountNumber = formData.noRek;

    try {
      const [sourceAccountId, beneficiaryAccountId] = await Promise.all([
        getAccountId(sourceAccountNumber),
        getAccountId(beneficiaryAccountNumber),
      ]);

      const { data } = await axios.post(
        `${VITE_API_URL}/transactions`,
        {
          account_id: sourceAccountId,
          beneficiary_account: beneficiaryAccountId,
          amount: formData.nominal,
          transaction_date: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
          note: formData.catatan,
          is_saved: formData.simpanRekening,
        },
        {
          headers: {
            Authorization: `Bearer ${getUserData().access_token}`,
          },
        }
      );

      navigate(`/transfer/receipt/${data.data.transaction_id}`, {
        replace: true,
      });
    } catch (error) {
      console.error('Transfer failed:', error);
    }
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
            <h4>{user?.account_number}</h4>
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
      <PinInput
        showPinInput={showPinInput}
        closePinInput={() => setShowPinInput(false)}
        onPinValidated={handlePinValidated}
      />
    </>
  );
}

export default TransferForm;
