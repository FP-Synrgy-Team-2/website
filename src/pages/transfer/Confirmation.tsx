import { useNavigate } from 'react-router-dom';
import { Breadcrumbs, Button } from '@/components';

function Confirmation() {
  const navigate = useNavigate();
  const breadcrumbs = [
    { label: 'Transfer', path: 'transfer' },
    { label: 'Input Data Transfer', path: '/transfer/new' },
    { label: 'Konfirmasi Transaksi', path: '/transfer/confirm' },
  ];

  const handleClick = () => {
    navigate('/transfer/pin', {
      replace: true,
      state: { from: '/transfer/new' },
    });
  };
  return (
    <div>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="max-w-[510px]">
        <div className="flex h-[76px] flex-row rounded-[10px] bg-primary-light-blue p-3">
          <div className="flex basis-1/2 gap-[20px]">
            <div className="flex h-[45px] w-[45px] self-center rounded-full bg-primary-blue font-semibold text-white">
              <span className="mx-auto my-0.5 text-3xl">Z</span>
            </div>
            <h1 className="self-center text-[24px]">Zakiansyah</h1>
          </div>
          <div className="grid basis-1/2 justify-items-end self-center">
            <div className="text-xl">Rp.252.672.982</div>
            <div className="text-lg">Rp.100.000</div>
          </div>
        </div>

        <div className="my-2 p-3">
          <h2 className="text-grey">Rincian Transaksi</h2>
        </div>
        <hr className="bg-greypudar" />

        <div className="flex gap-[92px] bg-white p-3">
          <div>
            <p className="my-3 text-muted-black">Rekening Sumber</p>
            <p className="my-3 text-muted-black">Rekening Tujuan</p>
            <p className="my-3 text-muted-black">Nama penerima</p>
            <p className="my-3 text-muted-black">Nominal Transfer</p>
            <p className="my-3 text-muted-black">Biaya Admin</p>
            <p className="my-3 text-muted-black">Catatan</p>
          </div>
          <div>
            <p className="my-3 text-dark-grey">8923445590</p>
            <p className="my-3 text-dark-grey">2448901238</p>
            <p className="my-3 text-dark-grey">John</p>
            <p className="my-3 text-dark-grey">Rp. 100.000</p>
            <p className="my-3 text-dark-grey">Rp 0</p>
            <p className="my-3 text-dark-grey">Bayar makanan</p>
          </div>
        </div>

        <div className="h-[60px] rounded-[10px] bg-primary-light-blue p-3">
          <div className="flex flex-row">
            <div className="basis-1/2">Total</div>
            <div className="flex basis-1/2 justify-end">Rp.100.000</div>
          </div>
        </div>

        <div className="my-10 flex justify-end gap-[20px]">
          <Button color="bg-white" className="">
            Kembali
          </Button>
          <div>
            <Button
              color="primary-dark-blue"
              className=""
              onClick={handleClick}
            >
              <div className="flex gap-[10px]">
                <p className="">Kirim</p>
                <div className="mt-0.5 self-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 12H3"
                      stroke="#FFFFFF"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M21.7152 11.7966L16.265 7.90356C15.7355 7.52535 15 7.90385 15 8.55455V15.4454C15 16.0961 15.7355 16.4746 16.265 16.0964L21.7152 12.2034C21.8548 12.1037 21.8548 11.8963 21.7152 11.7966Z"
                      fill="#FFFFFF"
                    />
                  </svg>
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
