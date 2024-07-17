import { FC, MouseEventHandler } from 'react';

type DashboardCardProps = {
  text: string;
  image: string;
  alt: string;
  size: '3.125rem' | '2.1875rem' | '1.875rem';
  ariaLabel: string;
  onClickFn: MouseEventHandler<HTMLLIElement>;
};

const DashboardCard: FC<DashboardCardProps> = ({
  text,
  image,
  alt,
  size,
  ariaLabel,
  onClickFn,
}) => {
  return (
    <li
      className="dash-card snap-center snap-normal border-black border-opacity-10 text-center text-dark-grey"
      onClick={onClickFn}
      tabIndex={0}
      aria-label={ariaLabel}
    >
      <div className="dash-avatar self-center bg-primary-light-blue">
        <img
          src={image}
          className="self-center"
          alt={alt}
          style={{ height: size, width: size }}
        />
      </div>

      {text}
    </li>
  );
};

export default DashboardCard;
