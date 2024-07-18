import React from 'react';
import sortArrow from '@/assets/icons/Sort_arrow.png';

const TableMutasi: React.FC = () => {
  function formatNumber(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }

  return (
    <div className="h-full w-182.5">
      <div className="flex items-center justify-between">
        <h1 className="font-xl-body uppercase" aria-label="mutasi rekening">
          Mutasi Rekening
        </h1>
        <button
          className="font-lg-body rounded-lg bg-primary-blue p-2 font-[550] uppercase text-neutral-01"
          aria-label="tombol tampilkan semua"
        >
          Tampilkan Semua
        </button>
      </div>
      <div className="mt-2 h-auto rounded-lg border border-grey py-7">
        <div className="mx-auto flex w-10/12 flex-col border-b py-4">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-light-blue text-primary-blue">
              <img src={sortArrow} alt="Arrow" />
            </div>
            <p className="text-lg-body font-bold" aria-label="Transfer">
              Transfer
            </p>
          </div>
          <div className="flex items-center justify-between gap-2 text-md-body font-regular uppercase">
            <p>bca</p>
            <p className="normal-case" aria-label={'Rp. '}>
              Rp. {formatNumber(2000000)}
            </p>
            <p className="text-grey" aria-label="tanggal">
              tanggal
            </p>
          </div>
        </div>
        <div className="mx-auto flex w-10/12 flex-col border-b py-4">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-light-blue text-primary-blue">
              <img src={sortArrow} alt="Arrow" />
            </div>
            <p className="text-lg-body font-bold" aria-label="Transfer">
              Transfer
            </p>
          </div>
          <div className="flex items-center justify-between gap-2 text-md-body font-regular uppercase">
            <p>bca</p>
            <p className="normal-case" aria-label={'Rp. '}>
              Rp. {formatNumber(2000000)}
            </p>
            <p className="text-grey" aria-label="tanggal">
              tanggal
            </p>
          </div>
        </div>
        <div className="mx-auto flex w-10/12 flex-col border-b py-4">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-light-blue text-primary-blue">
              <img src={sortArrow} alt="Arrow" />
            </div>
            <p className="text-lg-body font-bold" aria-label="Transfer">
              Transfer
            </p>
          </div>
          <div className="flex items-center justify-between gap-2 text-md-body font-regular uppercase">
            <p>bca</p>
            <p className="normal-case" aria-label={'Rp. '}>
              Rp. {formatNumber(2000000)}
            </p>
            <p className="text-grey" aria-label="tanggal">
              tanggal
            </p>
          </div>
        </div>
        <div className="mx-auto flex w-10/12 flex-col border-b py-4">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-light-blue text-primary-blue">
              <img src={sortArrow} alt="Arrow" />
            </div>
            <p className="text-lg-body font-bold" aria-label="Transfer">
              Transfer
            </p>
          </div>
          <div className="flex items-center justify-between gap-2 text-md-body font-regular uppercase">
            <p>bca</p>
            <p className="normal-case" aria-label={'Rp. '}>
              Rp. {formatNumber(2000000)}
            </p>
            <p className="text-grey" aria-label="tanggal">
              tanggal
            </p>
          </div>
        </div>
        <div className="mx-auto flex w-10/12 flex-col border-b py-4">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-light-blue text-primary-blue">
              <img src={sortArrow} alt="Arrow" />
            </div>
            <p className="text-lg-body font-bold" aria-label="Transfer">
              Transfer
            </p>
          </div>
          <div className="flex items-center justify-between gap-2 text-md-body font-regular uppercase">
            <p>bca</p>
            <p className="normal-case" aria-label={'Rp. '}>
              Rp. {formatNumber(2000000)}
            </p>
            <p className="text-grey" aria-label="tanggal">
              tanggal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableMutasi;
