import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumbs, ButtonPrimary } from '@/components';
import { SavedAccount } from '@/types';
import { snakeToCamelCase } from '@/utils/formatter';
import useAuth from '@/hooks/useAuth';

function Transfer() {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { api: axios, token, userId } = useAuth();
  const [accounts, setAccounts] = useState<SavedAccount[]>([]);
  const [fetchStatusMessage, setFetchStatusMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const fetchSavedAccounts = useCallback(async () => {
    const res = await axios.get(`/api/saved-accounts/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
    <section className="w-1/2">
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
      <Link to={'/transfer/new'} aria-label="tombol transfer rekening baru">
        <ButtonPrimary className="flex h-[5.328rem] w-[30.75rem] items-center gap-[0.375rem] rounded-2xl border-[0.5px] border-grey bg-primary-blue px-4 py-3 text-2xl text-neutral-01">
          <img
            src="images/icons/plus-circle.svg"
            alt=""
            className="w-[2.1875rem]"
          />
          Input Baru
        </ButtonPrimary>
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
        disabled={accounts.length === 0}
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
          {accounts.length !== 0 &&
            accounts.map((account, idx) => (
              <li className="w-full" key={idx}>
                <button
                  onClick={() =>
                    navigate('/transfer/saved', { state: { account } })
                  }
                  className="flex w-full flex-wrap gap-1 px-4 py-6 text-start"
                  aria-label={`${account.ownerName.toLowerCase()} ${account.accountNumber.split('').join(' ')}`}
                >
                  <p className="w-full">{account.ownerName}</p>
                  <p className="w-full text-grey">{account.accountNumber}</p>
                </button>
              </li>
            ))}
        </ul>
      ) : (
        <p className="sr-only">{fetchStatusMessage}</p>
      )}
    </section>
  );
}

export default Transfer;
