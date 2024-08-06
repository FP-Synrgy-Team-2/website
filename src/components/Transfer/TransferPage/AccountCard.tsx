import useAuth from '@/hooks/useAuth';
import { BankAccount } from '@/types';
import { snakeToCamelCase } from '@/utils/formatter';
import {
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Skeleton from 'react-loading-skeleton';

type AccountCardProps = {
  pushAccountFn?: Dispatch<SetStateAction<BankAccount | null>>;
};

const AccountCard: FC<AccountCardProps> = ({ pushAccountFn }) => {
  const { api, token, userId } = useAuth();
  const [account, setAccount] = useState<BankAccount | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isFetchFailed, setIsFetchFailed] = useState(false);

  const fetchAccount = useCallback(async () => {
    try {
      if (pushAccountFn) pushAccountFn(null);
      setIsFetchFailed(false);
      setIsFetching(true);
      const res = await api.get(`/api/bank-accounts/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.code === 404) throw new Error('not found');
      const account = snakeToCamelCase<BankAccount>(res.data.data);
      setAccount(account);
      if (pushAccountFn) pushAccountFn(account);
    } catch (err) {
      setIsFetchFailed(true);
    } finally {
      setIsFetching(false);
    }
  }, [setIsFetching, api, token, setAccount, setIsFetchFailed]);

  useEffect(() => {
    fetchAccount();
  }, [fetchAccount]);

  return (
    <p
      className="relative mt-2.5 flex h-[5.3281rem] w-full flex-col justify-center gap-[0.3125rem] rounded-xl bg-[#E4EDFF] px-6 py-2.5"
      aria-live="polite"
      aria-busy={isFetching}
    >
      {isFetching ? (
        <Skeleton />
      ) : (
        <span
          tabIndex={0}
          className={`flex gap-[0.3125rem] ${isFetchFailed ? 'text-lg text-danger' : 'text-xl-body text-primary-dark-blue'}`}
        >
          <>
            {isFetchFailed ? 'Gagal memuat data, ulangi?' : account?.ownerName}
            {isFetchFailed ? (
              <span className="ml-1 inline-flex items-center rounded-full p-0.5 hover:shadow-md">
                <button
                  type="button"
                  aria-label="Tombol muat ulang data rekening tujuan"
                  onClick={() => {
                    fetchAccount();
                  }}
                >
                  <img
                    src="/images/icons/arrow-clockwise.svg"
                    alt="Muat ulang"
                    aria-hidden
                  />
                </button>
              </span>
            ) : (
              <img
                src="/images/icons/color=blue.svg"
                alt="Bank Icon"
                aria-hidden
              />
            )}
          </>
        </span>
      )}
      <span
        className="text-lg text-dark-grey"
        aria-hidden={isFetchFailed || isFetching}
        tabIndex={isFetchFailed ? undefined : 0}
        aria-label={`Nomor rekening: ${account?.accountNumber.split('').join(' ')}`}
      >
        {isFetching ? (
          <Skeleton />
        ) : isFetchFailed ? (
          '•••••••'
        ) : (
          account?.accountNumber
        )}
      </span>
    </p>
  );
};

export default memo(AccountCard);
