import { Breadcrumbs, Button } from '@/components';
import { useNavigate } from 'react-router-dom';

function Receipt() {
  const navigate = useNavigate();
  const breadcrumbs = [
    { label: 'Transfer', path: '/transfer' },
    { label: 'Input Data Transfer', path: '/transfer/new' },
  ];

  const handleDownload = () => {
    console.log('Download receipt');
    navigate('/transfer/invoice/1');
  };

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="container w-[638px] rounded-[20px] border border-grey p-8 shadow-2xl">
        <div className="my-3 flex flex-col items-center p-3">
          <div className="my-2 flex h-[70px] w-[70px] rounded-full bg-success">
            <img
              src="/images/icons/checklist.png"
              alt="Berhasil"
              className="m-auto"
            />
          </div>
          <h1 className="text-lg font-bold">Tranksaksi Berhasil</h1>
          <div className="my-2 flex items-center gap-[15px] text-lg text-dark-grey">
            <p>10 Juni 2024</p>
            <div className="h-[10px] w-[10px] rounded-full bg-dot-grey"></div>
            <p>10.30</p>
          </div>
        </div>

        <div className="border-b-4 border-grey"></div>

        <div className="mt-3 flex gap-[40px] p-3 text-lg">
          <div className="text-muted-black">
            <p className="my-3">Rekening Sumber</p>
            <p className="my-3">Rekening Tujuan</p>
            <p className="my-3">Nama penerima</p>
            <p className="my-3">Nominal Transfer</p>
            <p className="my-3">Biaya Admin</p>
            <p className="my-3">Catatan</p>
            <p className="my-3">Total</p>
          </div>
          <div className="mx-auto text-dark-grey">
            <p className="my-3">8923445590</p>
            <p className="my-3">2448901238</p>
            <p className="my-3">John</p>
            <p className="my-3">Rp 100.000</p>
            <p className="my-3">Rp 0</p>
            <p className="my-3">Bayar makanan</p>
            <p className="my-3">Rp 100.000</p>
          </div>
        </div>

        <div className="border-b-2 border-grey"></div>

        <div className="mb-5 flex gap-[144px] p-3 text-lg">
          <div className="text-muted-black">
            <p className="my-3">Catatan</p>
            <p className="my-3">Total</p>
          </div>
          <div className="mx-auto text-dark-grey">
            <p className="my-3">Bayar makanan</p>
            <p className="my-3">Rp 100.000</p>
          </div>
        </div>
      </div>
      <div className="my-5 flex p-3">
        <div className="flex gap-7 self-center">
          <Button
            color="primary-dark-blue"
            className="h-[52] w-[167px] rounded-[30px] border border-primary-dark-blue bg-white px-10 py-3 font-bold text-primary-dark-blue"
          >
            Kembali
          </Button>
          <Button
            color="primary-dark-blue"
            className="flex h-[52] w-[167px] items-center justify-center gap-4 rounded-[30px] border border-primary-dark-blue px-10 py-3 font-bold text-white"
            onClick={handleDownload}
          >
            <img src="/images/icons/download.svg" alt="" /> Unduh
          </Button>
        </div>
      </div>
    </>
  );
}

export default Receipt;
