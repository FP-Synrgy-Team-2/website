import { FC } from 'react';
import personSvg from '../assets/person-fill.svg';
import DashboardCard from './DashboardCard';
import { useNavigate } from 'react-router-dom';

type SavedAccountCardProps = {
  name: string;
  image: string;
};

const SavedAccountCard: FC<SavedAccountCardProps> = ({ name, image }) => {
  const navigate = useNavigate();

  const onClickFn = () => {
    navigate('/transfer/saved');
  };

  return (
    <DashboardCard
      image={image ? image : personSvg}
      text={name}
      size={image ? '3.125rem' : '2.1875rem'}
      alt={`${name}'s avatar`}
      ariaLabel={`Transfer ke ${name}`}
      onClickFn={onClickFn}
    />
  );
};

export default SavedAccountCard;
