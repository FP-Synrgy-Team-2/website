import React from 'react';
import MutationRecord from './MutationRecord';

const TableMutasi: React.FC = () => {
  return (
    <section className="flex w-182.5 flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg uppercase" aria-label="mutasi rekening">
          Transaksi Akun
        </h2>
        <button
          className="h-12 w-42 rounded-xl bg-primary-blue p-2.5 text-center text-lg font-bold uppercase text-neutral-01"
          type="button"
          aria-label="tombol tampilkan semua"
        >
          Tampilkan Semua
        </button>
      </div>
      <ul id="mutation-table" aria-label="daftar mutasi rekening terakhir">
        <MutationRecord
          bankName="BCA"
          accountNumber={872726241}
          amount={-2000000}
          time={new Date()}
        />
        <MutationRecord
          bankName="BCA"
          accountNumber={872726241}
          amount={2000000}
          time={new Date()}
        />
        <MutationRecord
          bankName="BCA"
          accountNumber={872726241}
          amount={2000000}
          time={new Date()}
        />
        <MutationRecord
          bankName="BCA"
          accountNumber={872726241}
          amount={-2000000}
          time={new Date()}
        />
      </ul>
    </section>
  );
};

export default TableMutasi;
