import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SavedAccount } from '../../types/saved-accounts';

function Transfer() {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  // WHEN THE API IS READY
  // const [savedAccounts, setSavedAccounts] = useState<SavedAccounts[] | null>(null)
  const savedAccounts: SavedAccount[] = [
    {
      account_number: '2448901238',
      owner_name: 'ZAKIYANSYAH',
    },
    {
      account_number: '19827635112',
      owner_name: 'JOHN',
    },
    {
      account_number: '19827635112',
      owner_name: 'BUDI',
    },
    {
      account_number: '19827635112',
      owner_name: 'DANI',
    },
    {
      account_number: '19827635112',
      owner_name: 'DANI',
    },
  ];
  const navigate = useNavigate();

  // WHEN THE API IS READY
  // const fetchSavedAccounts = async () => {
  //     try {
  //         const response = await fetch("http://127.0.0.1:3001/saved-accounts");
  //         const res: SavedAccount[] = await response.json();
  //         setSavedAccounts(res)
  //     } catch {
  //         setSavedAccounts(null)
  //     }
  // }

  // useEffect(() => {
  //     fetchSavedAccounts()
  // }, [])

  return (
    <main className="container mx-auto bg-neutral-50 px-11 py-14">
      <section className="w-1/2">
        <h1 className="my-5 text-lg-body" aria-label="Transfer">
          Transfer
        </h1>
        <h2 className="my-5 text-sm-body" aria-label="Rekening tujuan">
          Rekening tujuan
        </h2>
        <Link
          to={'/transfer/new'}
          className="flex w-full items-center gap-[6px] rounded-2xl border-[0.5px] border-grey bg-primary-blue px-4 py-3 text-xs-body text-neutral-01"
          aria-label="tombol rekening baru"
        >
          <img src="images/icons/plus-circle.svg" alt="" width={'16px'} />
          Input Baru
        </Link>
        <h2
          className="my-3 text-sm-body"
          aria-label="pilih dari daftar rekening tersimpan"
        >
          Atau pilih dari daftar rekening tersimpan
        </h2>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex w-full items-center justify-between rounded-[20px] border-[0.5px] border-grey bg-transparent px-4 py-4 text-xs-body text-grey"
          aria-label="tombol pilih nomor rekening yang tersimpan"
        >
          Pilih nomor rekening yang tersimpan
          <img
            src="images/icons/arrow_drop_down_big.svg"
            alt=""
            className={`transition-transform duration-100 ease-in-out ${showDropdown ? 'rotate-180' : ''}`}
          />
        </button>
        {showDropdown && (
          <div className="scrollbar my-4 flex max-h-80 flex-wrap divide-y-[1px] divide-grey overflow-y-auto rounded-[20px] border-[0.5px] border-grey bg-neutral-01">
            {savedAccounts ? (
              savedAccounts.map((account, idx) => (
                <button
                  onClick={() =>
                    navigate('/transfer/saved', { state: { account } })
                  }
                  className="flex w-full flex-wrap gap-1 px-4 py-6 text-start"
                  key={idx}
                  aria-label={`${account.owner_name} ${account.account_number}`}
                >
                  <p className="w-full text-xs-body">{account.owner_name}</p>
                  <p className="w-full text-xs-body text-grey">
                    {account.account_number}
                  </p>
                </button>
              ))
            ) : (
              <p aria-label="gagal memperoleh data">Failed to fetch data</p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

export default Transfer;
