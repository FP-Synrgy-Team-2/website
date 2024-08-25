import useAuth from '@/hooks/useAuth';
import { SavedAccount } from '@/types';
import { cn } from '@/utils';
import { snakeToCamelCase } from '@/utils/formatter';
import { memo, useCallback, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';

interface DropdownProps {
  style?: string;
}

const Dropdown: FC<DropdownProps> = ({ style }) => {
  const { api, token, userId } = useAuth();
  const [accounts, setAccounts] = useState<SavedAccount[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isFetchFailed, setIsFetchFailed] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const fetchSavedAccounts = useCallback(async () => {
    try {
      setIsFetchFailed(false);
      setIsFetching(true);
      setShowDropdown(false);
      const res = await api.get(`/api/saved-accounts/${userId}`, {
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
    } catch (err) {
      setIsFetchFailed(true);
    } finally {
      setIsFetching(false);
    }
  }, [setAccounts, userId, token, api]);

  useEffect(() => {
    fetchSavedAccounts();
  }, []);

  if (isFetchFailed)
    return (
      <>
        <p>{'Gagal memuat data akun yang tersimpan, ulangi?'}</p>
        <button
          aria-label="tombol memuat ulang"
          onClick={() => fetchSavedAccounts()}
        >
          <img src="/images/icons/arrow-clockwise.svg" alt="icon muat ulang" />
        </button>
      </>
    );
  else
    return (
      <>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className={
            isFetching
              ? ''
              : cn(
                  style,
                  `flex h-[4rem] w-[31.25rem] items-center justify-between rounded-xl border-[0.5px] border-grey bg-transparent px-4 py-6 text-grey disabled:bg-[#efefef]`
                )
          }
          aria-live="polite"
          aria-busy={isFetching}
          disabled={accounts.length === 0 || isFetching}
          aria-label={`tombol pilih nomor rekening yang tersimpan ${isFetching ? 'sedang memuat' : ''}`}
        >
          {isFetching ? (
            <Skeleton className="h-[4rem] w-[31.25rem] rounded-xl" />
          ) : (
            <>
              {accounts.length === 0
                ? 'Belum ada nomor rekening yang tersimpan'
                : 'Pilih nomor rekening yang tersimpan'}
              <img
                src="/images/icons/arrow_drop_down_big.svg"
                alt="icon panah"
                className={`transition-transform duration-100 ease-in-out ${showDropdown ? 'rotate-180' : ''}`}
                aria-hidden
              />
            </>
          )}
        </button>
        {showDropdown && (
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
        )}
      </>
    );
};

export default memo(Dropdown);
