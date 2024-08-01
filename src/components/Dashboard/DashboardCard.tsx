import { FC, useRef } from 'react';

type DashboardCardProps = {
  text: string;
  image: string;
  size: '3.125rem' | '2.1875rem' | '1.875rem';
  ariaLabel: string;
  onClickFn: () => void;
};

const DashboardCard: FC<DashboardCardProps> = ({
  text,
  image,
  size,
  ariaLabel,
  onClickFn,
}) => {
  const getRandomId = (length: number) => {
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, (num) => num.toString(16)).join('');
  };

  const idRef = useRef(getRandomId(2));

  return (
    <li
      className="dash-card snap-center snap-normal border-black border-opacity-10 text-center text-dark-grey"
      aria-labelledby={idRef.current}
    >
      <button
        onClick={() => onClickFn()}
        id={idRef.current}
        aria-label={ariaLabel}
        className="flex flex-col items-center gap-2.5"
      >
        <div className="dash-avatar self-center bg-primary-light-blue">
          <img
            src={image}
            className="self-center"
            style={{ height: size, width: size }}
            aria-hidden
          />
        </div>

        <span className="no-scrollbar w-full overflow-x-scroll">{text}</span>
      </button>
    </li>
  );
};

export default DashboardCard;
