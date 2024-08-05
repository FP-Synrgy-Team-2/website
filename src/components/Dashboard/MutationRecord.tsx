import { FC } from 'react';
import transferSVG from '../../assets/arrow-up-down.svg';

type MutationRecordType = {
  bankName: string;
  accountNumber: number;
  total: number;
  type: string;
  time: Date;
};

const MutationRecord: FC<MutationRecordType> = ({
  bankName,
  accountNumber,
  total,
  type,
  time,
}) => {
  return (
    <li className="mutation-record">
      <div className="mb-2 flex gap-2.5 text-lg font-bold">
        <span
          className="box-content h-6 w-6 rounded-full bg-primary-light-blue bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${transferSVG})` }}
        />
        Transfer
      </div>
      <div className="text-md flex items-center justify-between font-regular">
        {bankName} - {accountNumber}
        <span>
          {type === 'Pengeluaran' ? '-' : '+'}{' '}
          {Math.abs(total).toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
          })}
        </span>
        <time className="text-grey" aria-label="tanggal">
          {time.toLocaleDateString('id-ID', { dateStyle: 'full' })}{' '}
          {time.toLocaleTimeString('id-ID', { hour12: false }).slice(0, -3)}
        </time>
      </div>
    </li>
  );
};

export default MutationRecord;
