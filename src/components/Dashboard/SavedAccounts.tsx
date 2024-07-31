import { useCallback, useEffect, useState } from 'react';
import SavedAccountCard from './SavedAccountCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { axios } from '@/axios';
import { snakeToCamelCase } from '@/utils/formatter';
import { SavedAccount } from '@/types';
import arrowClockwiseSVG from '../../assets/arrow-clockwise.svg';

const SavedAccounts = () => {
  const [accounts, setAccounts] = useState<SavedAccount[]>([]);
  const { userId } = JSON.parse(sessionStorage.getItem('session')!);
  const [isFetching, setIsFetching] = useState(true);
  const [isErrorFetching, setIsErrorFetcing] = useState(false);

  const fetchAccounts = useCallback(async () => {
    try {
      setIsFetching(true);
      const res = await axios.get(`/saved-accounts/${userId}`);
      if (Array.isArray(res.data.data))
        setAccounts(
          Array.from(res.data.data).map((account) =>
            snakeToCamelCase<SavedAccount>(account as { [key: string]: string })
          )
        );
      setIsErrorFetcing(false);
    } catch (err) {
      setIsErrorFetcing(true);
    } finally {
      setIsFetching(false);
    }
  }, [setAccounts, setIsFetching, setIsErrorFetcing, userId]);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  return (
    <section
      className="mt-2.5 flex flex-col gap-4.5"
      id="saved-accounts"
      aria-label="Dafter Rekening Tersimpan"
    >
      <h2 className="text-xl">REKENING TERSIMPAN</h2>
      <ul
        className={
          isErrorFetching || accounts.length === 0
            ? 'flex items-center text-lg'
            : 'flex h-full snap-y snap-mandatory flex-wrap justify-between gap-y-5 overflow-y-scroll'
        }
      >
        {!isFetching ? (
          !isErrorFetching ? (
            accounts.length !== 0 ? (
              accounts.map((a, i) => (
                <SavedAccountCard
                  image={''}
                  name={a.ownerName}
                  key={i}
                  accountNumber={parseInt(a.accountNumber)}
                />
              ))
            ) : (
              <>Belum ada rekening yang tersimpan</>
            )
          ) : (
            <>
              Memuat gagal, ulangi?{' '}
              <span className="ml-1 inline-flex items-center rounded-full p-0.5 hover:shadow-md">
                <button
                  type="button"
                  aria-label="Tombol muat ulang"
                  onClick={() => {
                    fetchAccounts();
                  }}
                >
                  <img src={arrowClockwiseSVG} alt="Muat ulang" />
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
