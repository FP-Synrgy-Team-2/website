import { FC } from 'react';

type MutationRecordType = {
  bankName: string;
  accountNumber: string;
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
          style={{ backgroundImage: `url('/images/icons/arrow-up-down.svg')` }}
        />
        {type === 'Pengeluaran' ? 'Transfer' : 'Terima Uang'}
      </div>
      <div className="text-md flex items-center justify-between font-regular sm:flex-col sm:items-start">
        {bankName} - {accountNumber}
        <span className="place-self-end">
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
