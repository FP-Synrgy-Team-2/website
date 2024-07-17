import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SavedAccount } from '../../types/saved-accounts';
import { Label } from '@/components/Label';
import { Input } from '@/components/Input';
import Button from '@/components/Button';

function Saved() {
  const location = useLocation();
  const account = location.state?.account as SavedAccount;

  const [nominal, setNominal] = useState('');
  const [catatan, setCatatan] = useState('');
  const [simpanRekening, setSimpanRekening] = useState(false);

  const handleSubmit = () => {
    if (account) {
      const dataTransfer = {
        ownerName: account.owner_name,
        accountNumber: account.account_number,
        nominal,
        catatan,
        simpanRekening,
      };

      console.log('Data Transfer:', dataTransfer);
      alert('Transfer Berhasil');
    } else {
      alert('Tidak ada data rekening tujuan.');
    }
  };

  return (
    <main className="w-[50%]">
      <div className="my-5">
        <h2 className="text-3xl font-semibold">
          Transfer &gt; Input Data Transfer
        </h2>
      </div>
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
          placeholder="******"
          value={nominal}
          onChange={(e) => setNominal(e.target.value)}
        />
      </div>

      <div className="mt-3">
        <Label className="text-xl">Catatan (Optional)</Label>
        <Input
          placeholder="Tambahkan catatan"
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
        />
      </div>

      <div className="mt-3 flex gap-1">
        <input
          type="checkbox"
          id="check"
          checked={simpanRekening}
          onChange={(e) => setSimpanRekening(e.target.checked)}
        />
        <label htmlFor="check">Simpan Rekening</label>
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

export default Saved;
