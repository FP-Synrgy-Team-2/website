import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '@/components';
import { SavedAccount } from '@/types';
import { axios } from '@/axios';
import { snakeToCamelCase } from '@/utils/formatter';

// const savedAccounts = [
//   {
//     account_number: '2448901238',
//     owner_name: 'ZAKIYANSYAH',
//     saved_account_id: '11111111'
//   },
//   {
//     account_number: '19827635112',
//     owner_name: 'JOHN',
//     saved_account_id: '11111111'
//   },
//   {
//     account_number: '19827635112',
//     owner_name: 'BUDI',
//     saved_account_id: '11111111'
//   },
//   {
//     account_number: '19827635112',
//     owner_name: 'DANI',
//     saved_account_id: '11111111'
//   },
//   {
//     account_number: '19827635112',
//     owner_name: 'DANI',
//     saved_account_id: '11111111'
//   },
// ].map(a => snakeToCamelCase<SavedAccount>(a))

function Transfer() {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { userId } = JSON.parse(sessionStorage.getItem('session')!);
  // WHEN THE API IS READY
  const [accounts, setAccounts] = useState<SavedAccount[] | null>(null);
  const [fetchStatusMessage, setFetchStatusMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname);

  // WHEN THE API IS READY
  const fetchSavedAccounts = useCallback(async () => {
    const res = await axios.get(`/saved-accounts/${userId}`);
    if (Array.isArray(res.data.data))
      setAccounts(
        Array.from(res.data.data).map((account) =>
          snakeToCamelCase<SavedAccount>(account as { [key: string]: string })
        )
      );
    else setFetchStatusMessage('Belum ada rekening yang tersimpan');
  }, [setAccounts, setFetchStatusMessage, userId]);

  useEffect(() => {
    fetchSavedAccounts().catch((err) => {
      console.error(err);
      setFetchStatusMessage('Gagal memuat rekening tersimpan');
    });
  }, [fetchSavedAccounts]);

  return (
    <div className="container bg-neutral-50 px-[2.6875rem] py-[4.625rem]">
      <section className="w-1/2">
        {/* <h1 className="my-5 text-lg-body" aria-label="Transfer">
          Transfer
        </h1> */}
        <Breadcrumbs
          breadcrumbs={[
            {
              label:
                location.pathname[1].toUpperCase() + location.pathname.slice(2),
              path: location.pathname,
            },
          ]}
        />
        <h2
          className="mb-[1.8125rem] mt-10 text-2xl"
          aria-label="Rekening tujuan"
        >
          Rekening tujuan
        </h2>
        <Link
          to={'/transfer/new'}
          className="flex h-[5.328rem] w-[30.75rem] items-center gap-[0.375rem] rounded-2xl border-[0.5px] border-grey bg-primary-blue px-4 py-3 text-2xl text-neutral-01"
          aria-label="tombol rekening baru"
        >
          <img
            src="images/icons/plus-circle.svg"
            alt=""
            className="w-[2.1875rem]"
          />
          Input Baru
        </Link>
        <h2
          className="mb-6 mt-[1.3rem] text-2xl"
          aria-label="pilih dari daftar rekening tersimpan"
        >
          Atau pilih dari daftar rekening tersimpan
        </h2>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className={`flex h-[6.25rem] w-[31.25rem] items-center justify-between rounded-[20px] border-[0.5px] border-grey bg-transparent px-4 py-6 text-2xl text-grey disabled:bg-[#efefef]`}
          disabled={accounts ? false : true}
          aria-label="tombol pilih nomor rekening yang tersimpan"
        >
          Pilih nomor rekening yang tersimpan
          <img
            src="images/icons/arrow_drop_down_big.svg"
            alt=""
            className={`transition-transform duration-100 ease-in-out ${showDropdown ? 'rotate-180' : ''}`}
          />
        </button>
        {showDropdown ? (
          <ul className="scrollbar my-4 flex max-h-80 flex-wrap divide-y-[1px] divide-grey overflow-y-auto rounded-[20px] border-[0.5px] border-grey bg-neutral-01">
            {accounts &&
              accounts.map((account, idx) => (
                <li className="w-full" key={idx}>
                  <button
                    onClick={() =>
                      navigate('/transfer/saved', { state: { account } })
                    }
                    className="flex w-full flex-wrap gap-1 px-4 py-6 text-start"
                    aria-label={`${account.ownerName} ${account.accountNumber}`}
                  >
                    <p className="w-full text-lg">{account.ownerName}</p>
                    <p className="w-full text-lg text-grey">
                      {account.accountNumber}
                    </p>
                  </button>
                </li>
              ))}
          </ul>
        ) : (
          <p className="sr-only">{fetchStatusMessage}</p>
        )}
      </section>
    </div>
  );
}

export default Transfer;
