import Button from '@/components/General/Button';
import { memo } from 'react';

const NextButton = () => {
  return (
    <Button
      type="submit"
      className="mt-[3.9375rem] h-[3.25rem] w-[10.4375rem] self-center rounded-lg bg-primary-dark-blue px-2.5 py-[0.3125rem] text-xl-body font-bold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label="Tombol lanjutkan"
    >
      {'Lanjutkan'}
    </Button>
  );
};

export default memo(NextButton);
