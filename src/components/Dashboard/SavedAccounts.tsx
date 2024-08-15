import { useCallback, useEffect, useState } from 'react';
import SavedAccountCard from './SavedAccountCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { snakeToCamelCase } from '@/utils/formatter';
import { SavedAccount } from '@/types';
import useAuth from '@/hooks/useAuth';

const SavedAccounts = () => {
  const [accounts, setAccounts] = useState<SavedAccount[]>([]);
  const { api: axios, userId, token } = useAuth();
  const [isFetching, setIsFetching] = useState(true);
  const [isErrorFetching, setIsErrorFetcing] = useState(false);
  const [fetchResult, setFetchResult] = useState('');

  const fetchAccounts = useCallback(async () => {
    try {
      setIsFetching(true);
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
      if (!accounts.length) setFetchResult('Belum ada rekening yang tersimpan');

      setIsErrorFetcing(false);
    } catch (err) {
      console.error(err);
      setFetchResult('Memuat gagal');
      setIsErrorFetcing(true);
    } finally {
      setIsFetching(false);
    }
  }, [setAccounts, setIsFetching, setIsErrorFetcing, userId, setFetchResult]);

  useEffect(() => {
    fetchAccounts().finally(() => console.log(isErrorFetching, fetchResult));
  }, [fetchAccounts]);

  return (
    <section
      className="mt-2.5 flex flex-col gap-4.5"
      id="saved-accounts"
      tabIndex={0}
      aria-labelledby="saved-account-list"
    >
      <h2 className="text-xl">REKENING TERSIMPAN</h2>
      <ul
        className={
          isErrorFetching || accounts.length === 0
            ? 'flex items-center text-lg'
            : 'no-scrollbar flex h-full snap-y snap-mandatory flex-wrap justify-between gap-y-5 overflow-y-scroll sm:grid sm:max-h-60 sm:grid-cols-3'
        }
        role={isErrorFetching ? 'alert' : 'list'}
        id="saved-account-list"
        aria-label={`Daftar rekening tersimpan:${!isFetching ? fetchResult : 'sedang memuat data'}`}
      >
        {!isFetching ? (
          !isErrorFetching ? (
            accounts.length !== 0 ? (
              accounts.map((a, i) => (
                <SavedAccountCard
                  image={''}
                  ownerName={a.ownerName}
                  key={i}
                  accountNumber={a.accountNumber}
                  savedAccountId={a.savedAccountId}
                />
              ))
            ) : (
              <>{fetchResult}</>
            )
          ) : (
            <>
              {fetchResult}, ulangi?{' '}
              <span className="ml-1 inline-flex items-center rounded-full p-0.5 hover:shadow-md">
                <button
                  type="button"
                  aria-label="Tombol muat ulang daftar rekening tersimpan"
                  onClick={() => {
                    fetchAccounts();
                  }}
                >
                  <img
                    src="/images/icons/arrow-clockwise.svg"
                    alt="Muat ulang"
                  />
                </button>
              </span>
            </>
          )
        ) : (
          <Skeleton
            className="h-27.5 w-25 rounded-xl"
            containerClassName="flex flex-wrap justify-between w-full gap-y-5"
            count={6}
          />
        )}
      </ul>
    </section>
  );
};

export default SavedAccounts;
