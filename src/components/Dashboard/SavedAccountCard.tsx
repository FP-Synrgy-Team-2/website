import { FC } from 'react';
import DashboardCard from './DashboardCard';
import { useNavigate } from 'react-router-dom';
import { SavedAccount } from '@/types';

interface SavedAccountCardProps extends SavedAccount {
  image: string;
}

const SavedAccountCard: FC<SavedAccountCardProps> = ({
  ownerName,
  image,
  accountNumber,
  savedAccountId,
}) => {
  const navigate = useNavigate();

  const onClickFn = () => {
    navigate('/transfer/saved', {
      state: {
        account: {
          savedAccountId,
          ownerName,
          accountNumber,
        },
      },
    });
  };

  return (
    <DashboardCard
      image={image ? image : '/images/icons/person-fill.svg'}
      text={ownerName.split(' ')[0]}
      size={image ? '3.125rem' : '2.1875rem'}
      ariaLabel={`Tombol transfer ke ${ownerName.toLowerCase()}`}
      onClickFn={onClickFn}
    />
  );
};

export default SavedAccountCard;
