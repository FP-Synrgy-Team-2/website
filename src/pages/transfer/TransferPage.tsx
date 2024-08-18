import { Link, useLocation } from 'react-router-dom';
import { Breadcrumbs, ButtonPrimary } from '@/components';
import Dropdown from '@/components/Transfer/TransferPage/Dropdown';

function Transfer() {
  const location = useLocation();

  return (
    <section className="w-1/2 sm:mx-4 sm:w-auto">
      <Breadcrumbs
        breadcrumbs={[
          {
            label:
              location.pathname[1].toUpperCase() + location.pathname.slice(2),
            path: location.pathname,
          },
        ]}
      />
      <h2 className="mb-[1.8125rem] mt-10" aria-label="Rekening tujuan">
        {'Rekening tujuan'}
      </h2>
      <Link to={'/transfer/new'} aria-label="tombol transfer rekening baru">
        <ButtonPrimary className="flex h-[4rem] w-[30.75rem] items-center gap-[0.375rem] rounded-xl border-[0.5px] border-grey bg-primary-blue px-4 py-3 text-neutral-01 sm:w-full">
          <img
            src="/images/icons/plus-circle.svg"
            alt="icon tambah"
            className="w-[2.1875rem]"
            aria-hidden
          />
          {'Input Baru'}
        </ButtonPrimary>
      </Link>
      <h2
        className="mb-6 mt-[1.3rem] sm:w-full"
        aria-label="pilih dari daftar rekening tersimpan"
      >
        {'Atau pilih dari daftar rekening tersimpan'}
      </h2>
      <Dropdown style="sm:w-full" />
    </section>
  );
}

export default Transfer;
