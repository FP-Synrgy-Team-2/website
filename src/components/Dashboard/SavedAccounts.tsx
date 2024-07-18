import { useEffect, useState } from 'react';
import SavedAccountCard from './SavedAccountCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Account {
  name: string;
  image: string;
}

export type { Account };

const SavedAccounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  const data: Account[] = [
    { name: 'Maxine', image: '/vite.svg' },
    { name: 'Oscar', image: '' },
    { name: 'Kevin', image: '' },
    { name: 'Stanley', image: '' },
    { name: 'Chloe', image: '/vite.svg' },
    { name: 'Dwight', image: '' },
    { name: 'Violet', image: '' },
    { name: 'Darryl', image: '' },
    { name: 'Caitlyn', image: '' },
    { name: 'Leslie', image: '' },
    { name: 'Franklin', image: '' },
    { name: 'Ron', image: '' },
    { name: 'Donna', image: '' },
  ];

  const generateRandom10Digits = () => {
    let randomDigits = '';
    for (let i = 0; i < 10; i++) {
      randomDigits += Math.floor(Math.random() * 10).toString();
    }
    return parseInt(randomDigits);
  };

  useEffect(() => {
    const populate = async () => {
      setTimeout(() => setAccounts(data), 3000);
    };

    populate();
  }, []);

  return (
    <section
      className="mt-2.5 flex flex-col gap-4.5"
      id="saved-accounts"
      aria-label="Dafter Rekening Tersimpan"
    >
      <h2 className="text-xl">REKENING TERSIMPAN</h2>
      <ul className="flex h-full snap-y snap-mandatory flex-wrap justify-between gap-y-5 overflow-y-scroll">
        {accounts.length != 0 ? (
          accounts.map((a, i) => (
            <SavedAccountCard
              image={a.image}
              name={a.name}
              key={i}
              accountNumber={generateRandom10Digits()}
            />
          ))
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
