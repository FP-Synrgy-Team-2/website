import { useEffect, useState } from 'react';
import SavedAccountCard from './SavedAccountCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useAuth } from '@/axios';
import { snakeToCamelCase } from '@/utils/formatter';

interface Account {
  accountId: string;
  name: string;
  accountNumber: string;
}

export type { Account };

const SavedAccounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const { userId } = JSON.parse(sessionStorage.getItem('session')!);
  const [isFetching, setIsFetching] = useState(true);
  const [isErrorFetching, setIsErrorFetcing] = useState(false);
  const axios = useAuth();

  useEffect(() => {
    const populate = async () => {
      console.log(userId);
      const res = await axios.get(`/saved-accounts/${userId}`);
      if (Array.isArray(res.data.data))
        setAccounts(
          Array.from(res.data.data).map((account) =>
            snakeToCamelCase<Account>(account as { [key: string]: any })
          )
        );
    };

    populate()
      .then(() => setIsErrorFetcing(false))
      .catch(() => setIsErrorFetcing(true))
      .finally(() => setIsFetching(false));
  }, []);

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
            ? 'flex h-full w-full text-center text-lg'
            : 'flex h-full snap-y snap-mandatory flex-wrap justify-between gap-y-5 overflow-y-scroll'
        }
      >
        {!isFetching ? (
          !isErrorFetching ? (
            accounts.length !== 0 ? (
              accounts.map((a, i) => (
                <SavedAccountCard
                  image={''}
                  name={a.name}
                  key={i}
                  accountNumber={parseInt(a.accountNumber)}
                />
              ))
            ) : (
              <>Tidak ada akun yang tersimpan</>
            )
          ) : (
            <>Error fetching</>
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
