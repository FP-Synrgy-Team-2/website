import { useState } from 'react';
import Button from '@/components/Button';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';

function TransferForm() {
  const [formData, setFormData] = useState({
    noRek: '',
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
    console.log('Data Transfer:', formData);
    alert('Transfer Berhasil');
  };

  return (
    <main className="w-[50%]">
      <div className="my-5">
        <h2 className="text-3xl font-bold">
          Transfer &gt; Input Data Transfer
        </h2>
      </div>
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
          name="noRek"
          placeholder="******"
          type="text"
          value={formData.noRek}
          onChange={handleChange}
        />
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
          className="ms-[200px] rounded-3xl bg-blue-500 px-6 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={handleSubmit}
        >
          Lanjutkan
        </Button>
      </div>
    </main>
  );
}

export default TransferForm;
