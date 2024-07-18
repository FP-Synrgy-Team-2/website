/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SavedAccount } from '@/types/saved-accounts';
import { Breadcrumbs, Label, Input, Button } from '@/components';

function Saved() {
  const breadcrumbs = [
    { label: 'Transfer', path: '/transfer' },
    { label: 'Input Data Transfer', path: '/transfer/new' },
  ];
  const location = useLocation();

  useEffect(() => {
    console.log(location.state);
  }, [location]);

  const account = location.state?.account as SavedAccount;

  const [formData, setFormData] = useState({
    nominal: '',
    catatan: '',
    simpanRekening: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = () => {
    if (account) {
      const dataTransfer = {
        ownerName: account.owner_name,
        accountNumber: account.account_number,
        ...formData,
      };

      console.log('Data Transfer:', dataTransfer);
      alert('Transfer Berhasil');
    } else {
      alert('Tidak ada data rekening tujuan.');
    }
  };

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      {account ? (
        <div className="mt-10">
          <Label className="text-xl">Rekening Tujuan</Label>
          <p className="mt-3 text-xl font-semibold">
            {account.owner_name} &bull; {''}
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
          name="nominal"
          placeholder="******"
          type="text"
          value={formData.nominal}
          onChange={handleChange}
        />
      </div>

      <div className="mt-3">
        <Label className="text-xl">Catatan (Optional)</Label>
        <Input
          name="catatan"
          placeholder="Tambahkan catatan"
          type="text"
          value={formData.catatan}
          onChange={handleChange}
        />
      </div>

      <div className="mt-3 flex gap-1">
        <input
          name="simpanRekening"
          type="checkbox"
          id="check"
          checked={formData.simpanRekening}
          onChange={handleChange}
        />
        <Label htmlFor="check" children="Simpan Rekening" />
      </div>

      <div className="mt-3">
        <Button
          color="blue"
          className="rounded-3xl bg-blue-500 px-6 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={handleSubmit}
        >
          Lanjutkan
        </Button>
      </div>
    </>
  );
}

export default Saved;
